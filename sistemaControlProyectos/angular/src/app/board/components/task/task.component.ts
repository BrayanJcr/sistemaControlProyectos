import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actividad, ListSchema } from "./../../../core";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { TaskService } from 'src/app/core/services/task.service';
import { ActividadService } from 'src/app/core/services/Actividad.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  actividad: Actividad[];
  @Output() editTask: EventEmitter<Actividad> = new EventEmitter();
  @Input() task: Actividad;
  @Input() list?: ListSchema;
  constructor(public dialog: MatDialog, public tasksService: TaskService,
  private service:ActividadService) {}  
  
    
  handleEditTask(task: Actividad){
    this.editTask.emit(task);
  }
  ngOnInit(){
    this.service.getActividad().subscribe(data =>{
      this.actividad= data;
    })
  }
  removeTask(taskId: number): void{
    console.log('Eliminar Tarea',taskId);
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result=>{
      if(this.list){
        this.service.removeTask(taskId,this.list);
      }
    });
  }

}
