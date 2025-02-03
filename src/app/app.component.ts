import { Component, inject } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter, first, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  firstRouteLoaded$ = this.router.events.pipe(
    filter((event) => event instanceof ChildActivationEnd),
    first(),
    map(() => {
      return true;
    }),
  );
}

