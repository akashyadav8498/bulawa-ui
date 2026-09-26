import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container" style="text-align: center; padding: var(--space-xxl) 0;">
      <h1 style="margin-bottom: var(--space-md);">Unauthorized</h1>
      <p style="margin-bottom: var(--space-lg);">You do not have permission to view this page.</p>
      <a routerLink="/" class="btn-primary">Return Home</a>
    </div>
  `
})
export class UnauthorizedComponent {}
