import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItem } from './task-item';
import { Task } from '../../interface/task/Task';

describe('TaskItem', () => {
  let component: TaskItem;
  let fixture: ComponentFixture<TaskItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItem);
    component = fixture.componentInstance;
     component.task = {
      id: '1',
      title: 'Test',
      description: '',
      completed: false,
      dueDate: new Date(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait émettre taskCompleted avec la tâche', () => {
  let emittedTask: Task | undefined;
  component.taskCompleted.subscribe(task => emittedTask = task);

  component.onTaskCompleted();

  expect(emittedTask).toEqual(component.task);
});

  it('devrait émettre taskDeleted avec l\'id de la tâche', () => {
  let emittedId: string | undefined;
  component.taskDeleted.subscribe(id => emittedId = id);

  component.onTaskDeleted();

  expect(emittedId).toEqual(component.task.id);
});
});
