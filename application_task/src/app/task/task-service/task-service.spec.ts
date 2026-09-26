import { TestBed } from '@angular/core/testing';
import { Goal } from '../../interface/Goal/goal';
import { TaskService } from './task-service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [TaskService] });
    service = TestBed.inject(TaskService);
  });

  it('crée une tâche avec son objectif', () => {
    const task = service.create('Préparer la réunion', 'goal-1');

    expect(task.title).toBe('Préparer la réunion');
    expect(task.goalId).toBe('goal-1');
    expect(task.completed).toBe(false);
  });

  it('inverse le statut et sauvegarde la tâche', () => {
    const task = service.create('Tâche', 'goal-1');
    const updatedTasks = service.toggle([task], task);

    expect(updatedTasks[0].completed).toBe(true);
    expect(service.load()[0].completed).toBe(true);
  });

  it('associe les anciennes tâches imbriquées à leur objectif', () => {
    const legacyTask = {
      id: 'task-1',
      title: 'Ancienne tâche',
      description: '',
      completed: false,
      dueDate: new Date(),
    };
    const goal = {
      id: 'goal-1',
      title: 'Objectif',
      limit_date: new Date(),
      completed: false,
      tasks: [legacyTask],
    };

    const tasks = service.loadForGoals([goal as Goal]);

    expect(tasks[0].goalId).toBe('goal-1');
    expect(service.getTasksForGoal(tasks, 'goal-1')).toEqual(tasks);
    expect('tasks' in goal).toBe(false);
  });
});