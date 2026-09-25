import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../interface/task/Task';

@Component({
  imports: [DatePipe],
  selector: 'app-task-item',
  styleUrl: './task-item.css',
  templateUrl: './task-item.html',
})
export class TaskItem  {
  @Input() task!: Task;
  @Output() taskCompleted = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<string>();

  onTaskCompleted() {
    this.taskCompleted.emit(this.task);
  }

  onTaskDeleted() {
    this.taskDeleted.emit(this.task.id);
  }
  
}
