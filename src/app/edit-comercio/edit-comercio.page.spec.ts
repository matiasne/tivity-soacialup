import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditComercioPage } from './edit-comercio.page';

describe('EditComercioPage', () => {
  let component: EditComercioPage;
  let fixture: ComponentFixture<EditComercioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComercioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComercioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
