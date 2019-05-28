import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ExplorerComponent } from './explorer.component';
describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;
  beforeEach(() => {
    const appComponentStub = { getData: { getDataTable: () => ({}) } };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExplorerComponent],
      providers: [{ provide: AppComponent, useValue: appComponentStub }]
    });
    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('backValue defaults to: []', () => {
    expect(component.backValue).toEqual([]);
  });
  it('can call back', ()=>{
    spyOn(component, 'back');
    component.back()
    expect(component.back).toHaveBeenCalled();
  })
  it('can call back', async ()=>{
    spyOn(component, 'changeValue');
    component.changeValue('folder')
    expect(component.changeValue).toHaveBeenCalled();
  })
});
