import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextreaderComponent } from './textreader.component';

describe('TextreaderComponent', () => {
  let component: TextreaderComponent;
  let fixture: ComponentFixture<TextreaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextreaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextreaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
