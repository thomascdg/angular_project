import { Component,inject,OnInit } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../../interface/task/Task';
import{ FormsModule } from '@angular/forms';
import { TaskStorage } from '../task-storage/task-storage';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  imports: [TaskItem,FormsModule],
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  private storage = inject(TaskStorage);

  addTask() {
    if (!this.newTitle.trim()) return;

    this.tasks.push({
      id: crypto.randomUUID(),
      title: this.newTitle,
      description: '',
      completed: false,
      dueDate: new Date(),
    });

    this.newTitle = '';
    this.storage.save(this.tasks);
  }

  onTaskCompleted(task: Task) {
    const taskToUpdate = this.tasks.find(t => t.id === task.id);
    if (taskToUpdate) taskToUpdate.completed = !taskToUpdate.completed;
  }

  onTaskDeleted(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.storage.delete(id);
  }

  ngOnInit() {
    this.tasks = this.storage.load();
  }
}