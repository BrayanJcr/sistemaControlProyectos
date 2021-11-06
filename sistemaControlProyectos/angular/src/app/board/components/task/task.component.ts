import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskSchema,ListSchema } from "./../../../core";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TaskService } from 'src/app/core/services/task.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Output() editTask: EventEmitter<TaskSchema> = new EventEmitter();
  @Input() task: TaskSchema;
  @Input() list?: ListSchema;
  constructor(public dialog: MatDialog, public tasksService: TaskService) {}  ngOnInit(): void {
  }
  handleEditTask(task: TaskSchema){
    this.editTask.emit(task);
  }

  removeTask(taskId:string):void{
    console.log('Eliminar Tarea',taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(this.list){
        this.tasksService.removeTask(taskId,this.list);
      }
    });
  }

}
