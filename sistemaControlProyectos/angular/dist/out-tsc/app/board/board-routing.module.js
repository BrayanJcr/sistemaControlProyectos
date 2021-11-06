import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
const routes = [
    {
        path: '',
        component: BoardComponent
    }
];
let BoardRoutingModule = class BoardRoutingModule {
};
BoardRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], BoardRoutingModule);
export { BoardRoutingModule };
//# sourceMappingURL=board-routing.module.js.map