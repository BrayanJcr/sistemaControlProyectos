import { Component, OnInit } from '@angular/core';
import { Actividad, ApiService, ListSchema } from './../../core';
import { TaskService } from 'src/app/core/services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  taskList: Actividad[];

  constructor(private apiService: ApiService, private taskService: TaskService) {}

  ngOnInit(): void {}

  // 
  
  getPrioritiesTask(PriorityType: string): void {
    this.taskService.getBoardList$
      .subscribe(
        (response: ListSchema[]) => {
          const lists = response;
          let tasks: Actividad[] = [];
          lists.map((element: ListSchema )=> {
            element.tasks.map((task: Actividad) => {
              if(task.proceso == PriorityType){
                tasks.push(task)
              }
            });
          });
          this.taskList = tasks;
        },
        (error: string) => (console.log('Ups! we have an error: ', error))
    );
  }
}
