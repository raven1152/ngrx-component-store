import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentStore } from '@ngrx/component-store';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UserStatusComponent } from './user-status/user-status.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserStatusComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    ComponentStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
