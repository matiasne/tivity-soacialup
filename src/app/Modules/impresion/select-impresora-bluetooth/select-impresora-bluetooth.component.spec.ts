import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectImpresoraBluetoothComponent } from './select-impresora-bluetooth.component';

describe('SelectImpresoraBluetoothComponent', () => {
  let component: SelectImpresoraBluetoothComponent;
  let fixture: ComponentFixture<SelectImpresoraBluetoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImpresoraBluetoothComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectImpresoraBluetoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
