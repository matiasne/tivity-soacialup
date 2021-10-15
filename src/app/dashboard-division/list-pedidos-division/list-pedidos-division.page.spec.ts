import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPedidosDivisionPage } from './list-pedidos-division.page';

describe('ListPedidosDivisionPage', () => {
  let component: ListPedidosDivisionPage;
  let fixture: ComponentFixture<ListPedidosDivisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPedidosDivisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPedidosDivisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
