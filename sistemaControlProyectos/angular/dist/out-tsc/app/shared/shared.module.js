import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialCdkModule } from "./../material-cdk/material-cdk.module";
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
const declarables = [HeaderComponent, FooterComponent];
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            declarables,
            ModalComponent
        ],
        imports: [
            CommonModule,
            MaterialCdkModule,
            RouterModule,
        ],
        exports: declarables,
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map