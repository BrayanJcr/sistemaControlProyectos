import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
        this.apiRoot = 'https://run.mocky.io/v3/7841d1af-e8d5-446a-bac5-3506fdd05659';
    }
    /* Get Api Data from mock service */
    getApi() {
        return this.http
            .get(this.apiRoot)
            .pipe(map(data => data), catchError(this.handleError));
    }
    /* Handle request error */
    handleError(res) {
        return observableThrowError(res.error || 'Server error');
    }
};
ApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ApiService);
export { ApiService };
//# sourceMappingURL=api.service.js.map