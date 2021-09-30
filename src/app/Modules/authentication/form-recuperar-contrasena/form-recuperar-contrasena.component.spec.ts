import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormRecuperarContrasenaComponent } from './form-recuperar-contrasena.component';

describe('FormRecuperarContrasenaComponent', () => {
  let component: FormRecuperarContrasenaComponent;
  let fixture: ComponentFixture<FormRecuperarContrasenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRecuperarContrasenaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormRecuperarContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
