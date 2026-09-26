import { Component, inject, OnInit } from '@angular/core';
import { TaskItem } from '../task-item/task-item';
import { Task } from '../../interface/task/Task';
import{ FormsModule } from '@angular/forms';
import { TaskService } from '../task-service/task-service';
import { Goal } from '../../interface/Goal/goal';
import { GoalStorage } from '../../goal/goal-storage/goal-storage';
import { ItemListBase } from '../../shared/item-list-base';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  imports: [TaskItem,FormsModule],
})
export class TaskList extends ItemListBase<Task> implements OnInit {
  goals: Goal[] = [];
  goalId = '';
  private readonly taskService = inject(TaskService);
  private readonly goalStorage = inject(GoalStorage);

  constructor() {
    super(inject(TaskService));
  }

  get tasks(): Task[] {
    return this.items;
  }

  set tasks(tasks: Task[]) {
    this.items = tasks;
  }

  protected createItem(title: string): Task {
    return this.taskService.create(title, this.goalId);
  }

  addTask(): void {
    this.addItem();
  }

  onTaskCompleted(task: Task): void {
    this.tasks = this.taskService.toggle(this.tasks, task);
  }

  onTaskDeleted(id: string): void {
    this.tasks = this.taskService.remove(this.tasks, id);
  }

  ngOnInit(): void {
    this.loadItems();
    this.goals = this.goalStorage.load();
  }
}