import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MessageboxComponent } from './messagebox.component';
describe('MessageboxComponent', () => {
  let component: MessageboxComponent;
  let fixture: ComponentFixture<MessageboxComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MessageboxComponent]
    });
    fixture = TestBed.createComponent(MessageboxComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('can call getPostion', () => {
    spyOn(component, 'getPostion').and.callThrough();
    component.ngOnInit();
    component.getPostion()
    expect(component.getPostion).toHaveBeenCalled();
  })
  xit('can call dst', () => {
    spyOn(component, 'dst').and.callThrough();
    component.dst()
    expect(component.dst).toHaveBeenCalled();
  })
});
