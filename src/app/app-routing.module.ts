import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import { TranslationComponent } from "./components/translation/translation.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ListUsersComponent } from "./components/list-users/list-users.component";
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminGuard } from './_helpers/admin.guard';
import { AuthGuard } from './_helpers/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ListTranslationsUserComponent } from './components/list-translations-user/list-translations-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AdminGuard], children: [
    { path: 'users', component: ListUsersComponent }
  ]},
  { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
  { path: 'translation', component: TranslationComponent, canActivate: [AuthGuard] },
  { path: 'my-translations', component: ListTranslationsUserComponent, canActivate: [AuthGuard] },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
