import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCocinaPage } from './edit-cocina.page';

describe('EditCocinaPage', () => {
  let component: EditCocinaPage;
  let fixture: ComponentFixture<EditCocinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCocinaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCocinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
