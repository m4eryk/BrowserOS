import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { WindowComponent } from './window.component';
describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;
  beforeEach(() => {
    const cdkDragDropStub = { previousIndex: {}, currentIndex: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [WindowComponent],
      providers: [{ provide: cdkDragDropStub, useValue: cdkDragDropStub }]
    });
    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('height defaults to: 0', () => {
    expect(component.height).toEqual('0');
  });
  it('width defaults to: 0', () => {
    expect(component.width).toEqual('0');
  });
  describe('changeSize', () => {
    it('makes expected calls', () => {
      spyOn(component, 'sizing').and.callThrough();
      component.changeSize();
      expect(component.sizing).toHaveBeenCalled();
    });
  });
});
