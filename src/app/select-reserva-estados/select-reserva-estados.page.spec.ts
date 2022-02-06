import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectReservaEstadosPage } from './select-reserva-estados.page';

describe('SelectReservaEstadosPage', () => {
  let component: SelectReservaEstadosPage;
  let fixture: ComponentFixture<SelectReservaEstadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReservaEstadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectReservaEstadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
