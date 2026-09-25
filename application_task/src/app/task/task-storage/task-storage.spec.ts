import { TestBed } from '@angular/core/testing';
import { TaskStorage } from './task-storage';

describe('TaskStorage', () => {
  let service: TaskStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait sauvegarder et charger les tâches', () => {
    const tasks = [
      { id: '1', title: 'Tâche 1', description: '', completed: false, dueDate: new Date() },
      { id: '2', title: 'Tâche 2', description: '', completed: true, dueDate: new Date() },
    ];

    service.save(tasks);
    const loadedTasks = service.load();

    expect(loadedTasks).toEqual(tasks);
  });

  it('devrait supprimer une tâche', () => {
    const task = { id: '1', title: 'Tâche à supprimer', description: '', completed: false, dueDate: new Date() };
    service.save([task]);

    service.delete(task.id);
    const loadedTasks = service.load();

    expect(loadedTasks.length).toBe(0);
  });

  it('devrait ne rien charger si aucune tâche n\'est sauvegardée', () => {
    const loadedTasks = service.load();

    expect(loadedTasks.length).toBe(0);
  });
});
