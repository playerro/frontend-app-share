import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { AlertComponent } from './directives/alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import {AuthGuard} from './guards/auth.guard';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interception';

import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {
  MAT_DATE_LOCALE,
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule
} from '@angular/material';
import {UserListComponent} from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatNativeDateModule} from '@angular/material';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {PostService} from './services/post.service';
import { AppDialogComponent } from './app-dialog/app-dialog.component';
import { AppsComponent } from './apps/apps.component';
import {ToolbarService} from './services/toolbar.service';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AlertComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserPageComponent,
    SettingsComponent,
    NotFoundComponent,
    ImageUploadComponent,
    AppDialogComponent,
    AppsComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    PostService,
    ToolbarService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  entryComponents: [
    AppDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
