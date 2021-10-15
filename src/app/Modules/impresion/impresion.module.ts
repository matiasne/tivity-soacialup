import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { ConfigImpresoraComponent } from './config-impresora/config-impresora.component';
import { EditImpresoraBluetoothComponent } from './edit-impresora-bluetooth/edit-impresora-bluetooth.component';
import { SelectImpresoraBluetoothComponent } from './select-impresora-bluetooth/select-impresora-bluetooth.component';

@NgModule({
  
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    DirectivesModule
  ],
  declarations: [
    ConfigImpresoraComponent,
    EditImpresoraBluetoothComponent,
    SelectImpresoraBluetoothComponent
  ],
  exports:[
    ConfigImpresoraComponent,
    EditImpresoraBluetoothComponent,
    SelectImpresoraBluetoothComponent
  ]
})
export class ImpresionModule { }
