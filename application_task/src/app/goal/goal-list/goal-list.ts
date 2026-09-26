import { Component, inject, OnInit } from '@angular/core';
import { GoalStorage } from '../goal-storage/goal-storage';
import { Goal } from '../../interface/Goal/goal';
import { GoalItem } from '../goal-item/goal-item';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [GoalItem,FormsModule],
  selector: 'app-goal-list',
  styleUrl: './goal-list.css',
  templateUrl: './goal-list.html',
})
export class GoalList implements OnInit {
  goals: Goal[] = [];
  newTitle = '';
  private storage = inject(GoalStorage);
  

  addGoal() {
    if (!this.newTitle.trim()) return;

    this.goals.push({
      id: crypto.randomUUID(),
      title: this.newTitle,
      limit_date: new Date(),
      completed: false,
      tasks: [],
    });
    
    this.newTitle = '';
    this.storage.save(this.goals);
  }

  onGoalCompleted(goal: Goal) {
    const goalToUpdate = this.goals.find(g => g.id === goal.id);
    if (goalToUpdate) goalToUpdate.completed = !goalToUpdate.completed;
  }

  onGoalDeleted(id: string) {
    this.goals = this.goals.filter(g => g.id !== id);
    this.storage.delete(id);
  }

  ngOnInit() {
    this.goals = this.storage.load();
  }
}
