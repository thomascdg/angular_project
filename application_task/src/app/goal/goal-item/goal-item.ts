import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../interface/Goal/goal';
import {DatePipe} from '@angular/common';
import { Task } from '../../interface/task/Task';
import { TaskItem } from '../../task/task-item/task-item';

@Component({
  imports: [DatePipe, TaskItem],
  selector: 'app-goal-item',
  styleUrl: './goal-item.css',
  templateUrl: './goal-item.html',
})
export class GoalItem {
  @Input() goal!: Goal;
  @Input() tasks: Task[] = [];
  @Output() goalCompleted = new EventEmitter<Goal>();
  @Output() goalDeleted = new EventEmitter<string>();
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();
  expanded = false;

  onGoalCompleted() {
    this.goalCompleted.emit(this.goal);
  }

  onGoalDeleted() {
    this.goalDeleted.emit(this.goal.id);
  }

  toggleTasks(): void {
    this.expanded = !this.expanded;
  }

  onTaskCompleted(task: Task): void {
    this.taskCompleted.emit(task);
  }

  onTaskDeleted(id: string): void {
    this.taskDeleted.emit(id);
  }
}
