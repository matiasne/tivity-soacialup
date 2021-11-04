import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormComandaComponent } from './form-comanda.component';

describe('FormComandaComponent', () => {
  let component: FormComandaComponent;
  let fixture: ComponentFixture<FormComandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComandaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
