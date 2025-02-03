import { Component, inject, OnInit } from '@angular/core';
import { UserStore } from '../+state/user.state';
import { tap } from 'rxjs';
import { UserAvailability } from '../+state/user.state';

@Component({
  selector: 'ogs-user-status',
  standalone: false,
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.scss',
})
export class UserStatusComponent implements OnInit {
  private store = inject(UserStore);
  public isAuthenticated$ = this.store.isAuthenticated$.pipe(
    tap(value => console.log('UserStatusComponent/tap/isAuthenticated', value)),
  );
  public state$ = this.store.state$.pipe(
    tap(value => console.log('UserStatusComponent/tap/state', value)),
  );
  public availabilities: { key: string, value: string }[] = [];

  constructor() { }

  ngOnInit() {
    this.availabilities = this.getAvailabilities();
  }

  private getAvailabilities() {
    let arr = [];
    for (const [key, value] of Object.entries(UserAvailability)) {
      arr.push({ key, value });
    }
    return arr;
  }
}
