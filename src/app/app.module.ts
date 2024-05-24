import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { TranslationComponent } from './pages/translation/translation.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    TranslationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
