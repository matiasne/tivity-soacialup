import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/Components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/Directives/directives.module';
import { CardItemComponent } from './card-item/card-item.component';
import { FormItemComponent } from './form-item/form-item.component';
import { ListItemsComponent } from './list-items/list-items.component';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DirectivesModule
  ],
  declarations: [
    CardItemComponent,
    FormItemComponent,
    ListItemsComponent
  ],
  exports:[
    CardItemComponent,
    FormItemComponent,
    ListItemsComponent
  ]
})
export class ItemsModule { }
