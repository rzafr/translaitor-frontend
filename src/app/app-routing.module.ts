import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LoginComponent } from './pages/login/login.component';
import { TranslationComponent } from "./pages/translation/translation.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ListUsersComponent } from "./components/list-users/list-users.component";
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: DashboardComponent, children: [
    { path: '', component: DashboardComponent }
  ]},
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'translation', component: TranslationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
