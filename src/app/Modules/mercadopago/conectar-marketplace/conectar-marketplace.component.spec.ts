import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConectarMarketplaceComponent } from './conectar-marketplace.component';

describe('ConectarMarketplaceComponent', () => {
  let component: ConectarMarketplaceComponent;
  let fixture: ComponentFixture<ConectarMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConectarMarketplaceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConectarMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
