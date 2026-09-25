import { Injectable } from '@angular/core';
import { Task } from '../../interface/task/Task';

@Injectable({
  providedIn: 'root',
})


export class TaskStorage {
    private readonly key = 'tasks';

  load(): Task[] {
    const raw = localStorage.getItem(this.key);
    return raw
      ? JSON.parse(raw).map((t: Task) => ({ ...t, dueDate: new Date(t.dueDate) }))
      : [];
  }

  save(tasks: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  delete(id: string): void {
    const tasks = this.load();
    const updatedTasks = tasks.filter(t => t.id !== id);
    this.save(updatedTasks);
  }
}
