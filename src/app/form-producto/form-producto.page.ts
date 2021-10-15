import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.page.html',
  styleUrls: ['./form-producto.page.scss'],
})
export class FormProductoPage implements OnInit {

  @Input() item:Item
  
  constructor(
    
  ) {   
  //  
  } 

  ngOnInit() {
  }

  async ionViewDidEnter(){   

  }


  ionViewDidLeave(){   

  }

  
  


}
