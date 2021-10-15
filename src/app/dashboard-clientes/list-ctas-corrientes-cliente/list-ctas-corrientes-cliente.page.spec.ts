import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCtasCorrientesClientePage } from './list-ctas-corrientes-cliente.page';

describe('ListCtasCorrientesClientePage', () => {
  let component: ListCtasCorrientesClientePage;
  let fixture: ComponentFixture<ListCtasCorrientesClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCtasCorrientesClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCtasCorrientesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
