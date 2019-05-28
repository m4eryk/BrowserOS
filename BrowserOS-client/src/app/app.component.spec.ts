import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const dataServiceStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: DataService, useValue: dataServiceStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('playerActiv defaults to: false', () => {
    expect(component.playerActiv).toEqual(false);
  });
  it('taskCount defaults to: 0', () => {
    expect(component.taskCount).toEqual(0);
  });
  it('tasks defaults to: []', () => {
    expect(component.tasks).toEqual([]);
  });
  it('shortcut defaults to: undefined', () => {
    expect(component.shortcut).toEqual(undefined);
  });
  it('state defaults to: { }', () =>{
    expect(component.state).toEqual({
      Loading : true,
      Work : false,
      Off : false
    });
  })
  it('exit defaults to: function', () => {
    spyOn(component, 'exit')
    component.ngOnInit();
    component.exit()
    expect(component.exit).toHaveBeenCalled();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loading').and.callThrough();
      component.ngOnInit();
      expect(component.loading).toHaveBeenCalled();
    });
  });
});
