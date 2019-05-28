import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TextreaderComponent } from './textreader.component';
describe('TextreaderComponent', () => {
  let component: TextreaderComponent;
  let fixture: ComponentFixture<TextreaderComponent>;
  beforeEach(() => {
    const appComponentStub = { setData: { setTextValue: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TextreaderComponent],
      providers: [{ provide: AppComponent, useValue: appComponentStub }]
    });
    fixture = TestBed.createComponent(TextreaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
