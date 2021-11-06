import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes = [
    {
        path: '',
        redirectTo: '/board',
        pathMatch: 'full',
    },
    {
        path: 'board',
        //loadChildren: './board/board.module#BoardModule'
        loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
    },
    {
        path: 'home',
        //loadChildren: './home/home.module#HomeModule',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'Kanban/Kanban',
        component: AppComponent
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map