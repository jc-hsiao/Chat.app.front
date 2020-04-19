import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DmComponent } from './dm.component';

describe('DmComponent', () => {
  let component: DmComponent;
  let fixture: ComponentFixture<DmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
