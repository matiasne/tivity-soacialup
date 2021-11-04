import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCajaEgresoPage } from './edit-caja-egreso.page';

describe('EditCajaEgresoPage', () => {
  let component: EditCajaEgresoPage;
  let fixture: ComponentFixture<EditCajaEgresoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCajaEgresoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCajaEgresoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
