import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCdkModule } from './../material-cdk/material-cdk.module';
import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ActividadService } from '../core/services/Actividad.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
let BoardModule = class BoardModule {
};
BoardModule = __decorate([
    NgModule({
        declarations: [
            BoardComponent,
            ListComponent,
            TaskComponent,
            CreateTaskComponent
        ],
        imports: [
            CommonModule,
            BoardRoutingModule,
            MaterialCdkModule,
            FormsModule,
            ReactiveFormsModule,
        ],
        providers: [ActividadService]
    })
], BoardModule);
export { BoardModule };
//# sourceMappingURL=board.module.js.map