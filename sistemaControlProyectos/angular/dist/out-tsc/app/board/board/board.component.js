import { __decorate } from "tslib";
import { Component } from '@angular/core';
const initialValue = {
    id: '',
    description: '',
    date: '',
    priority: '',
};
let BoardComponent = class BoardComponent {
    constructor(apiService, taskService) {
        this.apiService = apiService;
        this.taskService = taskService;
        this.isOverlayDisplayed = false;
        this.overlayOptions = {
            hasBackdrop: true,
            positions: [
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' },
            ],
        };
        this.task = initialValue;
        this.lists = [];
    }
    ngOnInit() {
        // this.getDataList();
        this.getDataStored();
    }
    getDataList() {
        this.apiService.getApi().subscribe((response) => (this.lists = response['list']), (error) => console.log('Ups! we have an error: ', error));
    }
    getDataStored() {
        this.taskService.getBoardList$
            .subscribe((response) => this.lists = response, (error) => (console.log('Ups! we have an error: ', error)));
    }
    displayOverlay(event) {
        this.isOverlayDisplayed = true;
        if (!!event) {
            this.task = {
                date: event.date,
                id: event.id,
                description: event.description,
                priority: event.priority,
            };
            if (event.listId) {
                this.listId = event.listId;
            }
        }
        else {
            this.task = initialValue;
        }
    }
    hideOverlay() {
        this.isOverlayDisplayed = false;
    }
};
BoardComponent = __decorate([
    Component({
        selector: 'app-board',
        templateUrl: './board.component.html',
        styleUrls: ['./board.component.scss'],
    })
], BoardComponent);
export { BoardComponent };
//# sourceMappingURL=board.component.js.map