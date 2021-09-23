import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Localizacion } from '../models/localizacion';
import * as geofirex from 'geofirex';
import { ComerciosService } from '../Services/comercios.service';
import { Comercio } from '../models/comercio';
declare var google: any;
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-modal-input-direccion',
  templateUrl: './modal-input-direccion.page.html',
  styleUrls: ['./modal-input-direccion.page.scss'],
})
export class ModalInputDireccionPage implements OnInit {

  @Input() localizacion:Localizacion;

  @ViewChild('map',{static: false}) mapElement: ElementRef;

  public map: any;
  public geo:any; 

  public autocomplete:any;
  public place:any;
  public markers:any =[];

  public geocoder:any;

  public direccion = "";

  private comercio:Comercio;

  private distancia:any

  constructor(
    private modalCtrl:ModalController,
    private comerciosService:ComerciosService
  ) {     

    this.comercio = new Comercio()
    this.comercio.asignarValores(this.comerciosService.getSelectedCommerceValue())
    this.localizacion = new Localizacion()
  }

  ngOnInit() {  
     
    
    if(this.localizacion.street_name){
      this.direccion = this.localizacion.street_name+" "+this.localizacion.street_number+", "+this.localizacion.locality+", "+this.localizacion.state
    }
    
    
    setTimeout(() => {           
      this.initAutocomplete('pac-input');     
    }, 3000);  

    this.geocoder = new google.maps.Geocoder();

    this.initMap("mapDiv",{
      center:{
        lat:Number(this.localizacion.lat),
        lng:Number(this.localizacion.lng)
      },
      zoom:15 ,
      options: {
        disableDefaultUI: true,
        scrollwheel: true,
        streetViewControl: false,
      },    
    });

    let position = {lat: Number(this.localizacion.lat), lng: Number(this.localizacion.lng)};

    var marker = this.setMarker({
      position: position,
      map: this.map,
      title: 'Mi dirección',
      draggable:true,
    });

  }

  initMap(el, options) {
    this.map = this.makeMap(el, options)

    var markerOptions = {
        draggable: true,
        map: this.map,
        position: options.center,
        zoom:5 ,
    }    
  }

  makeMap(el, options) {
    
    if(google){
      console.log(el);
      let mapEle: HTMLElement = document.getElementById(el);
      console.log(mapEle);
      return new google.maps.Map(mapEle, options)
    }
    
  }

  
  initAutocomplete(el = "autocomplete", options = { types: ["geocode"], componentRestrictions: { country: "ar" }}, fields = ["address_components", "geometry", "icon", "name"]) {
    // Create the autocomplete object, restricting the search predictions to geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById(el).getElementsByTagName('input')[0], options
    )
    console.log(this.autocomplete);
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    // Set the data fields to return when the user selects a place.
    this.autocomplete.setFields(fields)

    if (this.map) {
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        this.autocomplete.bindTo("bounds", this.map)
    }

    this.autocomplete.addListener("place_changed",()=>{
      console.log("place_changed");
      this.place = this.autocomplete.getPlace()
      console.log(this.place);

     
      this.localizacion.lat = this.place.geometry.location.lat();
      this.localizacion.lng = this.place.geometry.location.lng();

      var marker = this.setMarker({
        position: {lat: Number(this.place.geometry.location.lat()), lng: Number(this.place.geometry.location.lng())},
        map: this.map,
        title: 'Hello World!',
        draggable:true,
      });

      var bounds = new google.maps.LatLngBounds();      
      bounds.extend(marker.getPosition());
      this.map.fitBounds(bounds);

      var zoomChangeBoundsListener = google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(event) {
        if ( this.getZoom() ){   // or set a minimum
            this.setZoom(16);  // set zoom here
        }
      });

      setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000);

      this.fillInAddressForm(this.place.address_components);

      this.geo = geofirex.init(firebase);
      this.localizacion.distanciaDelComercio = Number(this.geo.distance(this.geo.point(this.comercio.direccion.lat, this.comercio.direccion.lng), this.geo.point(this.localizacion.lat, this.localizacion.lng)).toFixed(2))
    
    });

  }

  
  fillInAddressForm(addressComponents = this.place.address_components) {
  
    var pickedAddress =  {
      street_number: ["street_number", "short_name"],
      route: ["street_name", "long_name"],
      locality: ["locality", "long_name"],
      administrative_area_level_1: ["state", "short_name"],
      country: ["country", "long_name"],
      postal_code: ["zip", "short_name"],
      sublocality_level_1: ["sublocality", "long_name"],
    }

    console.log(pickedAddress.street_number[1]);

    var addressType; 

    console.log(addressComponents)

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    var direccion_completa ="";
    for (var i = 0; i < addressComponents.length; i++) {
        addressType = addressComponents[i].types[0]

        if (pickedAddress[addressType]) {
            console.log(addressType)
            direccion_completa = direccion_completa +" "+  addressComponents[i][pickedAddress[addressType][1]]+","

            if(addressType == "country")
              this.localizacion.country = addressComponents[i][pickedAddress[addressType][1]];
            
            if(addressType == "locality")
              this.localizacion.locality = addressComponents[i][pickedAddress[addressType][1]];

            if(addressType == "route")
              this.localizacion.street_name = addressComponents[i][pickedAddress[addressType][1]];

            if(addressType == "street_number")
              this.localizacion.street_number = addressComponents[i][pickedAddress[addressType][1]];
            
            if(addressType == "state")
              this.localizacion.state = addressComponents[i][pickedAddress[addressType][1]];
            
            if(addressType == "administrative_area_level_1")
              this.localizacion.state = addressComponents[i][pickedAddress[addressType][1]];
        }
    }

   /* setTimeout(function () {
      document.getElementById('pac-input').click();
    }, 2500);*/
 
      
  }


  setMarker(options) {

    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    var marker = new google.maps.Marker(options)
    this.markers.push(marker)
    return marker
  }

  guardar(){
    this.modalCtrl.dismiss(this.localizacion);
  }

  cerrar(){
    this.modalCtrl.dismiss()
  }

}
