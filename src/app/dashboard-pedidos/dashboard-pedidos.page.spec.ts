import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardPedidosPage } from './dashboard-pedidos.page';

describe('DashboardPedidosPage', () => {
  let component: DashboardPedidosPage;
  let fixture: ComponentFixture<DashboardPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPedidosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
