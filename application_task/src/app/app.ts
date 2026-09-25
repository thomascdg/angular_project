import { Component } from '@angular/core';

import {TaskList} from './task/task-list/task-list';


@Component({
  imports: [TaskList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
