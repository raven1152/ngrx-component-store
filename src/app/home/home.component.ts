import { Component, inject } from '@angular/core';
import { UserStore } from '../+state/user.state';
import { state } from '@angular/animations';

@Component({
  selector: 'ogs-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [UserStore],
})
export class HomeComponent {
  private store = inject(UserStore);
  public state$ = this.store.state$;
  public isAuthenticated$ = this.store.isAuthenticated$;
  protected readonly state = state;
}
