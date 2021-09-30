import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListReservasDivisionPage } from './list-reservas-division.page';

describe('ListReservasDivisionPage', () => {
  let component: ListReservasDivisionPage;
  let fixture: ComponentFixture<ListReservasDivisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReservasDivisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListReservasDivisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
