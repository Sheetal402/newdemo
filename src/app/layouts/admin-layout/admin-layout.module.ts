import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
// import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
// import { RegistersComponent } from 'app/pages/registers/registers.component';
import { CommentComponent }            from '../../pages/comment/comment.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
// import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TableComponent,
    // UpgradeComponent,
    // TypographyComponent,
    // RegistersComponent,
    IconsComponent,
    CommentComponent,
    NotificationsComponent
  ],
  exports:[
    MatPaginatorModule
  ]
})

export class AdminLayoutModule {}
