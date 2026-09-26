import { Component, inject, OnInit } from '@angular/core';
import { GoalStorage } from '../goal-storage/goal-storage';
import { Goal } from '../../interface/Goal/goal';
import { GoalItem } from '../goal-item/goal-item';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interface/task/Task';
import { TaskService } from '../../task/task-service/task-service';
import { ItemListBase } from '../../shared/item-list-base';

@Component({
  imports: [GoalItem,FormsModule],
  selector: 'app-goal-list',
  styleUrl: './goal-list.css',
  templateUrl: './goal-list.html',
})
export class GoalList extends ItemListBase<Goal> implements OnInit {
  tasks: Task[] = [];
  private readonly goalStorage = inject(GoalStorage);
  private readonly taskService = inject(TaskService);

  constructor() {
    super(inject(GoalStorage));
  }

  get goals(): Goal[] {
    return this.items;
  }

  set goals(goals: Goal[]) {
    this.items = goals;
  }

  protected createItem(title: string): Goal {
    return {
      id: crypto.randomUUID(),
      title,
      limit_date: new Date(),
      completed: false,
    };
  }

  addGoal(): void {
    this.addItem();
  }

  onGoalCompleted(goal: Goal): void {
    this.toggleItem(goal);
  }

  onGoalDeleted(id: string): void {
    this.deleteItem(id);
  }

  onTaskCompleted(task: Task): void {
    this.tasks = this.taskService.toggle(this.tasks, task);
  }

  onTaskDeleted(id: string): void {
    this.tasks = this.taskService.remove(this.tasks, id);
  }

  tasksForGoal(goalId: string): Task[] {
    return this.taskService.getTasksForGoal(this.tasks, goalId);
  }

  ngOnInit(): void {
    this.loadItems();
    this.tasks = this.taskService.loadForGoals(this.goals);
    this.goalStorage.save(this.goals);
  }
}
