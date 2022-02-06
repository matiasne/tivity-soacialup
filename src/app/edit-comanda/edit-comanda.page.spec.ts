import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditComandaPage } from './edit-comanda.page';

describe('EditComandaPage', () => {
  let component: EditComandaPage;
  let fixture: ComponentFixture<EditComandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComandaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
