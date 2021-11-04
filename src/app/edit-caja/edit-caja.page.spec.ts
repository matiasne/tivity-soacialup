import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCajaPage } from './edit-caja.page';

describe('EditCajaPage', () => {
  let component: EditCajaPage;
  let fixture: ComponentFixture<EditCajaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCajaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCajaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
