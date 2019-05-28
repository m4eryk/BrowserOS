import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavBarComponent]
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('panel defaults to: false', () => {
    expect(component.panel).toEqual(false);
  });
  it('can call showPanel', () => {
    spyOn(component, 'showPanel').and.callThrough;
    component.ngOnInit();
    component.showPanel();
    expect(component.showPanel).toHaveBeenCalled();
  })
});
