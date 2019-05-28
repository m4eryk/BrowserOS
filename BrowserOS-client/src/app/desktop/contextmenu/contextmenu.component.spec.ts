import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContextmenuComponent } from './contextmenu.component';
describe('ContextmenuComponent', () => {
  let component: ContextmenuComponent;
  let fixture: ComponentFixture<ContextmenuComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContextmenuComponent]
    });
    fixture = TestBed.createComponent(ContextmenuComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('x defaults to: 0', () => {
    expect(component.x).toEqual(0);
  });
  it('y defaults to: 0', () => {
    expect(component.y).toEqual(0);
  });
});
