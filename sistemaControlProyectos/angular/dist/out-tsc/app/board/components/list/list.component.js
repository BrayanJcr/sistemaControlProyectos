import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
let ListComponent = class ListComponent {
    constructor(tasksService) {
        this.tasksService = tasksService;
        this.editTask = new EventEmitter();
    }
    ngOnInit() {
    }
    drop(event) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
    handleEdit(task) {
        if (this.list) {
            task.listId = this.list.id;
            this.editTask.emit(task);
        }
    }
};
__decorate([
    Input()
], ListComponent.prototype, "list", void 0);
__decorate([
    Output()
], ListComponent.prototype, "editTask", void 0);
ListComponent = __decorate([
    Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss']
    })
], ListComponent);
export { ListComponent };
//# sourceMappingURL=list.component.js.map