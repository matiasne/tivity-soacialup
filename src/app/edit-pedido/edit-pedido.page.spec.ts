import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPedidoPage } from './edit-pedido.page';

describe('EditPedidoPage', () => {
  let component: EditPedidoPage;
  let fixture: ComponentFixture<EditPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
