import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCajaAperturaPage } from './edit-caja-apertura.page';

describe('EditCajaAperturaPage', () => {
  let component: EditCajaAperturaPage;
  let fixture: ComponentFixture<EditCajaAperturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCajaAperturaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCajaAperturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
