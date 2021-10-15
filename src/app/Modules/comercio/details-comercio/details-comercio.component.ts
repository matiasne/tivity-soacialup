import { Component, Input, OnInit } from '@angular/core';
import { Comercio } from 'src/app/models/comercio';

@Component({
  selector: 'app-details-comercio',
  templateUrl: './details-comercio.component.html',
  styleUrls: ['./details-comercio.component.scss'],
})
export class DetailsComercioComponent implements OnInit {

  @Input() comercio:Comercio;
  
  constructor() { }

  ngOnInit() {}

}
