import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [ RouterModule, CommonModule, MatIconModule, MatPaginatorModule ],
    declarations: [ SidebarComponent ],
    exports: [ SidebarComponent, MatPaginatorModule ]
})

export class SidebarModule {}
