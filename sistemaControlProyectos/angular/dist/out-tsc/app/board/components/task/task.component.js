import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
let TaskComponent = class TaskComponent {
    constructor(dialog, tasksService, service) {
        this.dialog = dialog;
        this.tasksService = tasksService;
        this.service = service;
        this.editTask = new EventEmitter();
    }
    handleEditTask(task) {
        this.editTask.emit(task);
    }
    ngOnInit() {
        this.service.getActividad().subscribe(data => {
            this.actividad = data;
        });
    }
    removeTask(taskId) {
        console.log('Eliminar Tarea', taskId);
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (this.list) {
                this.service.removeTask(taskId, this.list);
            }
        });
    }
};
__decorate([
    Output()
], TaskComponent.prototype, "editTask", void 0);
__decorate([
    Input()
], TaskComponent.prototype, "task", void 0);
__decorate([
    Input()
], TaskComponent.prototype, "list", void 0);
TaskComponent = __decorate([
    Component({
        selector: 'app-task',
        templateUrl: './task.component.html',
        styleUrls: ['./task.component.scss']
    })
], TaskComponent);
export { TaskComponent };
//# sourceMappingURL=task.component.js.map