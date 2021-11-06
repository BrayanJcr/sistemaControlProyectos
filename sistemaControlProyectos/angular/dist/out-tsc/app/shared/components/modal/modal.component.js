import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
let ModalComponent = class ModalComponent {
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
    }
    ngAfterViewInit() {
        this.templatePortal = new TemplatePortal(this.templatePortalContent, this._viewContainerRef);
    }
};
__decorate([
    ViewChild('templatePortalContent')
], ModalComponent.prototype, "templatePortalContent", void 0);
ModalComponent = __decorate([
    Component({
        selector: 'app-modal',
        templateUrl: './modal.component.html',
        styleUrls: ['./modal.component.scss']
    })
], ModalComponent);
export { ModalComponent };
//# sourceMappingURL=modal.component.js.map