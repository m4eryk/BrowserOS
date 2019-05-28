import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { DesktopPageComponent } from '../desktop-page/desktop-page.component';
import { ShortcutComponent } from './shortcut.component';
describe('ShortcutComponent', () => {
  let component: ShortcutComponent;
  let fixture: ComponentFixture<ShortcutComponent>;
  beforeEach(() => {
    const appComponentStub = {
      creatData: { textFile: () => ({}), folder: () => ({}) }
    };
    const desktopPageComponentStub = { contextmenu: {} };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ShortcutComponent],
      providers: [
        { provide: AppComponent, useValue: appComponentStub },
        { provide: DesktopPageComponent, useValue: desktopPageComponentStub }
      ]
    });
    fixture = TestBed.createComponent(ShortcutComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('clickout', () => {
    it('makes expected calls', () => {
      spyOn(component, 'onclick').and.callThrough();
      component.onclick('folder','folder');
      expect(component.onclick).toHaveBeenCalled();
    });
  });
});
