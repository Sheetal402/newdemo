import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { CommentComponent } from '../../pages/comment/comment.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'todo',          component: CommentComponent }
];
