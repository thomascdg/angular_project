import { Component } from '@angular/core';

import {TaskList} from './task/task-list/task-list';
import {GoalList} from './goal/goal-list/goal-list';


@Component({
  imports: [TaskList, GoalList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
