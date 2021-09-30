import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListSubscripcionesClientePage } from './list-subscripciones-cliente.page';

describe('ListSubscripcionesClientePage', () => {
  let component: ListSubscripcionesClientePage;
  let fixture: ComponentFixture<ListSubscripcionesClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubscripcionesClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSubscripcionesClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
