import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { users } from './data/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login(request: LoginRequest): Observable<LoginResponse | null> {
    // for now, just return an object with the right properties
    let user = users.find(u => u.userId === request.userId);
    if (!user) { return of(null); }
    return of({
      ...user,
    });
  }
}
