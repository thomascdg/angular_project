import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../interface/Goal/goal';
import {DatePipe} from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-goal-item',
  styleUrl: './goal-item.css',
  templateUrl: './goal-item.html',
})
export class GoalItem {
  @Input() goal!: Goal;
  @Output() goalCompleted = new EventEmitter<Goal>();
  @Output() goalDeleted = new EventEmitter<string>();

  onGoalCompleted() {
    this.goalCompleted.emit(this.goal);
  }

  onGoalDeleted() {
    this.goalDeleted.emit(this.goal.id);
  }
}
