import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevolverPedidoPage } from './devolver-pedido.page';

describe('DevolverPedidoPage', () => {
  let component: DevolverPedidoPage;
  let fixture: ComponentFixture<DevolverPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolverPedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DevolverPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
