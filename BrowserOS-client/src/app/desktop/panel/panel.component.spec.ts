import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PanelComponent]
    });
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('makes expected count calss dblclick', () => {
      let item = {
        type : 'mp3'
      }
      spyOn(component, 'dblclick');
      component.ngOnInit();
      component.dblclick(item);
      expect(component.timer.call.length).toEqual(1);
    });
})
