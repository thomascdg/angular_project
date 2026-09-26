import { inject, Injectable } from '@angular/core';
import { Goal } from '../../interface/Goal/goal';
import { Task } from '../../interface/task/Task';
import { TaskStorage } from '../task-storage/task-storage';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storage = inject(TaskStorage);

  load(): Task[] {
    return this.storage.load();
  }

  save(tasks: Task[]): void {
    this.storage.save(tasks);
  }

  delete(id: string): void {
    this.storage.delete(id);
  }

  create(title: string, goalId?: string): Task {
    return {
      id: crypto.randomUUID(),
      title,
      description: '',
      completed: false,
      dueDate: new Date(),
      goalId: goalId || undefined,
    };
  }

  toggle(tasks: Task[], task: Task): Task[] {
    const updatedTasks = tasks.map(current =>
      current.id === task.id
        ? { ...current, completed: !current.completed }
        : current,
    );
    this.save(updatedTasks);
    return updatedTasks;
  }

  remove(tasks: Task[], id: string): Task[] {
    const remainingTasks = tasks.filter(task => task.id !== id);
    this.save(remainingTasks);
    return remainingTasks;
  }

  loadForGoals(goals: Goal[]): Task[] {
    const tasks = this.load();
    const storedTaskIds = new Set(tasks.map(task => task.id));
    let migratedLegacyTasks = false;

    goals.forEach(goal => {
      goal.tasks.forEach(task => {
        if (!storedTaskIds.has(task.id)) {
          tasks.push({ ...task, goalId: goal.id });
          storedTaskIds.add(task.id);
          migratedLegacyTasks = true;
        }
      });
    });

    if (migratedLegacyTasks) {
      this.save(tasks);
    }

    this.assignToGoals(goals, tasks);
    return tasks;
  }

  assignToGoals(goals: Goal[], tasks: Task[]): void {
    goals.forEach(goal => {
      goal.tasks = tasks.filter(task => task.goalId === goal.id);
    });
  }
}