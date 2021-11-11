import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ApiService, Actividad, ListSchema } from '../';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class ActividadService {
    url="/Actividades/Listar";
    private readonly boardList = new BehaviorSubject<ListSchema[]>([]);
  readonly list$ = this.boardList.asObservable();
  readonly getBoardList$ = this.list$.pipe(map((list) => list));
    constructor(private http:HttpClient) {}

    
/* getter list of Board */
get list(): ListSchema[] {
    return this.boardList.getValue();
  }

  /* setter list of Board */
  set list(value: ListSchema[]) {
    this.boardList.next(value);
  }
    getActividad(){
        return this.http.get<Actividad[]>(this.url);
    }
    addTask(data: Actividad): void {
        const card = data;
        const elementsIndex = this.list.findIndex(
          (element) => element.id === '1'
        );
        this.list[elementsIndex].tasks.push(card);
      }
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