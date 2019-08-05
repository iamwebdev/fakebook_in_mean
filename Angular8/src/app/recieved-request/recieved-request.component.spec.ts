import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievedRequestComponent } from './recieved-request.component';

describe('RecievedRequestComponent', () => {
  let component: RecievedRequestComponent;
  let fixture: ComponentFixture<RecievedRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievedRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievedRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
