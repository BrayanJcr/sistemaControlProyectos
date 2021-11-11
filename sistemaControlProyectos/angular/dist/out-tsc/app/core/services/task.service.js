import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
let TaskService = class TaskService {
    constructor(apiService) {
        this.apiService = apiService;
        this.boardList = new BehaviorSubject([]);
        this.list$ = this.boardList.asObservable();
        this.getBoardList$ = this.list$.pipe(map((list) => list));
        this.loadInitialData();
    }
    /* Load initial data to render in a component */
    loadInitialData() {
        return this.apiService.getApi().subscribe((response) => {
            if (!!response) {
                this.boardList.next(response['list']);
            }
        });
    }
    /* getter list of Board */
    get list() {
        return this.boardList.getValue();
    }
    /* setter list of Board */
    set list(value) {
        this.boardList.next(value);
    }
    /* Add new card to board list */
    addTask(data) {
        const card = data;
        const elementsIndex = this.list.findIndex((element) => element.id === '1');
        this.list[elementsIndex].tasks.push(card);
    }
    /* Edit card on list */
    updateTask(data, listId) {
        if (data) {
            const elementsIndex = this.list.findIndex((element) => element.id === listId);
            const task = this.list[elementsIndex].tasks.map((element) => {
                if (element.IDActividad === data.IDActividad) {
                    element.FechaFin = new Date(data.FechaFin);
                    element.FechaInicio = new Date(data.FechaInicio);
                    element.Descripcion = data.Descripcion;
                    element.Estado = data.Estado;
                    element.titActividad = data.titActividad;
                    element.proceso = data.proceso;
                    element.IDProyecto = data.IDProyecto;
                    element.creador = data.creador;
                }
                return element;
            });
        }
    }
    /* Remove a card of board list */
    removeTask(dataId, list) {
        const elementsIndex = this.list.findIndex((element) => element.id == list.id);
        const tasks = this.list[elementsIndex].tasks.filter((task) => task.IDActividad !== dataId);
        this.list[elementsIndex].tasks = tasks;
    }
};
TaskService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], TaskService);
export { TaskService };
//# sourceMappingURL=task.service.js.map