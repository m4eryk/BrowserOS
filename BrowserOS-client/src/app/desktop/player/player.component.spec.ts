import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { PlayerComponent } from './player.component';
describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  beforeEach(() => {
    const appComponentStub = {
      audio: {
        src: {},
        play: () => ({}),
        currentTime: { toFixed: () => ({}) },
        duration: { toFixed: () => ({}) },
        pause: () => ({}),
        volume: {},
        load: () => ({})
      }
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PlayerComponent],
      providers: [{ provide: AppComponent, useValue: appComponentStub }]
    });
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('justsrc defaults to: 0', () => {
    expect(component.justsrc).toEqual(0);
  });
  it('activ defaults to: false', () => {
    expect(component.activ).toEqual(false);
  });
  it('start defaults to: -', () => {
    expect(component.start).toEqual('-');
  });
  it('end defaults to: -', () => {
    expect(component.end).toEqual('-');
  });
  it('view defaults to: false', () => {
    expect(component.view).toEqual(false);
  });
  it('music defaults to: []', () => {
    expect(component.music).toEqual([]);
  });
  it('makes expected calls viewFalse', () => {
    spyOn(component, 'viewFalse').and.callThrough();
    component.viewFalse()
    expect(component.viewFalse).toHaveBeenCalled();
  })
  it('makes expected calls viewTrue', () => {
    spyOn(component, 'viewTrue').and.callThrough();
    component.viewTrue()
    expect(component.viewTrue).toHaveBeenCalled();
  })
  xdescribe('play', () => {
    it('makes expected calls', () => {
      spyOn(component, 'next').and.callThrough();
      spyOn(component, 'progress').and.callThrough();
      component.play();
      expect(component.next).toHaveBeenCalled();
      expect(component.progress).toHaveBeenCalled();
    });
  });
  xdescribe('next', () => {
    it('makes expected calls', () => {
      spyOn(component, 'play').and.callThrough();
      component.next();
      expect(component.play).toHaveBeenCalled();
    });
  });
  xdescribe('previous', () => {
    it('makes expected calls', () => {
      spyOn(component, 'play').and.callThrough();
      component.previous();
      component.play();
      expect(component.play).toHaveBeenCalled();
    });
  });
});
