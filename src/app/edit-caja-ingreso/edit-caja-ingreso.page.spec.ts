import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCajaIngresoPage } from './edit-caja-ingreso.page';

describe('EditCajaIngresoPage', () => {
  let component: EditCajaIngresoPage;
  let fixture: ComponentFixture<EditCajaIngresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCajaIngresoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCajaIngresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
