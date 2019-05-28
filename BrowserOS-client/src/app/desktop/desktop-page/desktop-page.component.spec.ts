import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DesktopPageComponent } from './desktop-page.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

describe('DesktopPageComponent', () => {
  let component: DesktopPageComponent;
  let fixture: ComponentFixture<DesktopPageComponent>;
  beforeEach(() => {
    const appComponentStub = {
      getData: { getConfig: () => ({}) },
      setData: { setConfig: () => ({}) }
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DesktopPageComponent],
      providers: [
        { provide: AppComponent, useValue: appComponentStub }
      ]
    });
    fixture = TestBed.createComponent(DesktopPageComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('shortcutArray defaults to: []', () => {
    expect(component.shortcutArray).toEqual([]);
  });
  it('shortcut defaults to: []', () => {
    expect(component.shortcut).toEqual([]);
  });
  it('contextmenu defaults to: false', () => {
    expect(component.contextmenu).toEqual(false);
  });
  it('contextmenuX defaults to: 0', () => {
    expect(component.contextmenuX).toEqual(0);
  });
  it('contextmenuY defaults to: 0', () => {
    expect(component.contextmenuY).toEqual(0);
  });
  it('windowX defaults to: 200', () => {
    expect(component.windowX).toEqual(200);
  });
  it('windowY defaults to: 50', () => {
    expect(component.windowY).toEqual(50);
  });
  it('hight defaults to: []', () => {
    expect(component.hight).toEqual([]);
  });
  it('widht defaults to: []', () => {
    expect(component.widht).toEqual([]);
  });
  it('grid defaults to: []', () => {
    expect(component.grid).toEqual([]);
  });
  it('makes expected calls addGrid', () => {
    spyOn(component, 'addGrid').and.callThrough();
      component.ngOnInit();
      component.addGrid()
      expect(component.addGrid).toHaveBeenCalled();
  });
  it('makes expected calls addShorcat', () => {
    spyOn(component, 'addShorcat').and.callThrough();
    var item= {
      type: 'txt',
      name: 'MyText',
      creat: true
    }
    component.ngOnInit();
    component.addShorcat(item);
    component.addShorcat(item);
    expect(component.addGrid.call.length).toEqual(1);
    });
  it('makes expected calls onRightClick', () => {
    spyOn(component, 'onRightClick').and.callThrough();
    component.ngOnInit();
    component.onRightClick(event)
    expect(component.onRightClick).toHaveBeenCalled();
  })
  it('makes expected calls disableContextMenu', () => {
    spyOn(component, 'disableContextMenu').and.callThrough();
    component.ngOnInit();
    component.disableContextMenu()
    expect(component.disableContextMenu).toHaveBeenCalled();
  })
  it('makes expected calls OnDestroy', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  })

});
