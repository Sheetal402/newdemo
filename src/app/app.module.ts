import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { WebService } from "./web.service";
import { TaskService } from "./task.service";
import { MatTableModule} from "@angular/material/table"
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { PopupComponent } from "./pages/popup/popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { LoginComponent } from "./pages/login/login.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { MatButtonModule } from "@angular/material/button";
import { TokenInterceptor } from "./auth/token.interceptor";
import { AuthService } from "./auth/auth.service";
import { EditcommentComponent } from './pages/editcomment/editcomment.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { AuthGuard } from "./auth/auth.guard";
import { RegistersComponent } from './pages/registers/registers.component';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PopupComponent,
    LoginComponent,
    WelcomeComponent,
    EditcommentComponent,
    RegistersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    Ng2SearchPipeModule
  ],
  exports: [
    MatPaginatorModule,
  ],
  providers: [
              WebService, 
              TaskService,
              AuthService,
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
              AuthGuard
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
