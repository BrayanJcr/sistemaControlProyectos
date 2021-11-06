import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
const routes: Routes = [
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
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
