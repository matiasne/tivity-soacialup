import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCajaCierrePage } from './edit-caja-cierre.page';

describe('EditCajaCierrePage', () => {
  let component: EditCajaCierrePage;
  let fixture: ComponentFixture<EditCajaCierrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCajaCierrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCajaCierrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
