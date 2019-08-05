import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentRequestComponent } from './sent-request.component';

describe('SentRequestComponent', () => {
  let component: SentRequestComponent;
  let fixture: ComponentFixture<SentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
