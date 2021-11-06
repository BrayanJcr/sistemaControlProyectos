import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialCdkModule } from './../material-cdk/material-cdk.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
let HomeModule = class HomeModule {
};
HomeModule = __decorate([
    NgModule({
        declarations: [
            HomeComponent
        ],
        imports: [
            CommonModule,
            HomeRoutingModule,
            MaterialCdkModule
        ]
    })
], HomeModule);
export { HomeModule };
//# sourceMappingURL=home.module.js.map