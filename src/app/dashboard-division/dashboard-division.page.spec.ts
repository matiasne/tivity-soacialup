import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardDivisionPage } from './dashboard-division.page';

describe('DashboardDivisionPage', () => {
  let component: DashboardDivisionPage;
  let fixture: ComponentFixture<DashboardDivisionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDivisionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardDivisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
