import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomeComponent = class HomeComponent {
    constructor(apiService, taskService) {
        this.apiService = apiService;
        this.taskService = taskService;
    }
    ngOnInit() { }
    // 
    getPrioritiesTask(PriorityType) {
        this.taskService.getBoardList$
            .subscribe((response) => {
            const lists = response;
            let tasks = [];
            lists.map((element) => {
                element.tasks.map((task) => {
                    if (task.priority == PriorityType) {
                        tasks.push(task);
                    }
                });
            });
            this.taskList = tasks;
        }, (error) => (console.log('Ups! we have an error: ', error)));
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss'],
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map