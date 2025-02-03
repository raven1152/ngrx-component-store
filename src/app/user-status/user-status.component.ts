import { Component, inject } from '@angular/core';
import { UserStore } from '../+state/user.state';
import { tap } from 'rxjs';

@Component({
  selector: 'ogs-user-status',
  standalone: false,
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.scss',
})
export class UserStatusComponent {
  private store = inject(UserStore);
  public isAuthenticated$ = this.store.isAuthenticated$.pipe(
    tap(value => console.log('UserStatusComponent/tap/isAuthenticated', value)),
  );
  public state$ = this.store.state$.pipe(
    tap(value => console.log('UserStatusComponent/tap/state', value)),
  );
}
