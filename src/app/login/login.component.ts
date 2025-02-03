import { Component, inject } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { UserStore } from '../+state/user.state';

@Component({
  selector: 'ogs-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store = inject(UserStore);
  model: LoginRequest = {
    userId: 'djpreston',
    password: 'asdf',
  };
  public state$ = this.store.state$;
  public isAuthenticated$ = this.store.isAuthenticated$;

  submit() {
    this.store.login(this.model);
  }
}
