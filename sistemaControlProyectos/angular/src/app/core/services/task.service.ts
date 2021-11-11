import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService, Actividad, ListSchema } from '../';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly boardList = new BehaviorSubject<ListSchema[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map((list) => list));

  constructor(private apiService: ApiService) {
    this.loadInitialData();
  }

  /* Load initial data to render in a component */
  loadInitialData(): any {
    return this.apiService.getApi().subscribe((response: any) => {
      if (!!response) {
        this.boardList.next(response['list']);
      }
    });
  }

  /* getter list of Board */
  get list(): ListSchema[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: ListSchema[]) {
    this.boardList.next(value);
  }

  /* Add new card to board list */
  addTask(data: Actividad): void {
    const card = data;
    const elementsIndex = this.list.findIndex(
      (element) => element.id === '1'
    );
    this.list[elementsIndex].tasks.push(card);
  }

  /* Edit card on list */
  updateTask(data: Actividad, listId: string): void {
    if (data) {
      const elementsIndex = this.list.findIndex(
        (element) => element.id === listId
      );
      const task = this.list[elementsIndex].tasks.map((element) => {
        if (element.IDActividad === data.IDActividad) {
          element.FechaFin = new Date(data.FechaFin);
          element.FechaInicio = new Date(data.FechaInicio);
          element.Descripcion = data.Descripcion;
          element.Estado = data.Estado;
          element.titActividad = data.titActividad;
          element.proceso = data.proceso;
          element.IDProyecto=data.IDProyecto;
          element.creador=data.creador;
        }
        return element;
      });
    }
  }

  /* Remove a card of board list */
  removeTask(dataId: number, list: ListSchema): void {
    const elementsIndex = this.list.findIndex(
      (element) => element.id == list.id
    );
    const tasks = this.list[elementsIndex].tasks.filter(
      (task) => task.IDActividad !== dataId
    );
    this.list[elementsIndex].tasks = tasks;
  }

}