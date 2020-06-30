import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserPageComponent} from './user-page/user-page.component';
import {SettingsComponent} from './settings/settings.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AppsComponent} from './apps/apps.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'page/:username', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'apps', component: AppsComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(appRoutes);
