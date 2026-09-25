import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';

describe('TaskList', () => {
  let component: TaskList;
  let fixture: ComponentFixture<TaskList>;

  beforeEach(async () => {
    localStorage.clear(); // Clear localStorage before each test
    await TestBed.configureTestingModule({
      imports: [TaskList],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskList);
    component = fixture.componentInstance;
     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    component.newTitle = 'Nouvelle tâche';
    component.addTask();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Nouvelle tâche');
  });

  it('devrait marquer une tâche comme terminée', () => {
    const task = {
      id: '1',
      title: 'Tâche à compléter',
      description: '',
      completed: false,
      dueDate: new Date(),
    };
    component.tasks.push(task);

    component.onTaskCompleted(task);

    expect(component.tasks[0].completed).toBe(true);
  });

  it('devrait supprimer une tâche', () => {
    const task = {
      id: '1',
      title: 'Tâche à supprimer',
      description: '',
      completed: false,
      dueDate: new Date(),
    };
    component.tasks.push(task);

    component.onTaskDeleted(task.id);

    expect(component.tasks.length).toBe(0);
  });
});
