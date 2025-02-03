import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LoginRequest } from '../models/login-request.model';
import { Injectable } from '@angular/core';

export enum UserAvailability {
  available = "Available",
  busy = "Busy",
  inAMeeting = "In a meeting",
  doNotDisturb = "Do not disturb",
  beRightBack = "Be right back",
  away = "Away",
  appearAway = "Appear away",
  offline = "Offline",
  appearOffline = "Appear offline",
}

export interface UserStatus {
  availability: UserAvailability;
  duration: number;
  message: string;
}

export interface UserState {
  userId: string | null;
  lastName: string | null;
  firstName: string | null;
  email: string | null;
  isAuthenticated: boolean;
  authDateTime: Date | null;
  status: UserStatus | null;
}

const initialState: UserState = {
  userId: null,
  lastName: null,
  firstName: null,
  email: null,
  isAuthenticated: false,
  authDateTime: null,
  status: null,
}

@Injectable({
  providedIn: 'root',
})
export class UserStore extends ComponentStore<UserState> {
  constructor(private loginService: LoginService) {
    super(initialState);
    console.log('UserStore is initialized');
  }

  public readonly userState$ = this.select(state => state);

  public readonly isAuthenticated$ = this.select(state => state.isAuthenticated);

  public readonly updateToInitialState = this.updater(
    (state: UserState) => {
      return {
        ...initialState,
      }
    }
  )

  public readonly updateUser = this.updater(
    (state: UserState, user: { userId: string | null, lastName: string | null, firstName: string | null, email: string | null }) => {
      console.log(user);
      return {
        ...state,
        userId: user.userId,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
      };
    },
  );

  public readonly updateLoginState = this.updater((state: UserState, isAuthenticated: boolean) => {
    return {
      ...state,
      isAuthenticated,
      authDateTime: isAuthenticated ? new Date() : null,
    };
  });

  public readonly updateUserStatus = this.updater(
    (state: UserState, status: UserStatus) => {
      console.log(status);
      return {
        ...state,
        status,
      };
    },
  );

  public readonly login = this.effect<LoginRequest>(login$ => {
    return login$.pipe(
      switchMap(loginRequest => this.loginService.login(
        loginRequest
      ).pipe(
        tap((user) => {
          if (user) {
            this.updateUser(user);
            this.updateUserStatus({
              availability: UserAvailability.available,
              duration: 0,
              message: '',
            });
            this.updateLoginState(true);
          }
        }),
      )),
    );
  });

  public readonly logout = this.effect(logout$ => {
    return logout$.pipe(
      tap(() => {
        this.updateToInitialState();
      }),
    );
  });
}
