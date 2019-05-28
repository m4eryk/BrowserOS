import { TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
describe('TaskComponent', () => {
  let pipe: TaskComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TaskComponent] });
    pipe = TestBed.get(TaskComponent);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
