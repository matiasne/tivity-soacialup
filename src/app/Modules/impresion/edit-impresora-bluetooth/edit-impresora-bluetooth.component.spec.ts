import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditImpresoraBluetoothComponent } from './edit-impresora-bluetooth.component';

describe('EditImpresoraBluetoothComponent', () => {
  let component: EditImpresoraBluetoothComponent;
  let fixture: ComponentFixture<EditImpresoraBluetoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImpresoraBluetoothComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditImpresoraBluetoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
