import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormComercioComponent } from './form-comercio.component';

describe('FormComercioComponent', () => {
  let component: FormComercioComponent;
  let fixture: ComponentFixture<FormComercioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComercioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
