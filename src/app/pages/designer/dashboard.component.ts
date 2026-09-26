import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { MOCK_DESIGNS, MOCK_METRICS } from './designer.mock';
import { DesignCardComponent } from './components/design-card.component';

@Component({
  selector: 'app-designer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, DesignCardComponent],
  template: `
    <div class="dashboard animate-fade-up">
      <header class="dashboard-header">
        <div class="header-content">
          <span class="eyebrow">Overview</span>
          <h1>Welcome back, {{ user()?.firstName || 'Designer' }}</h1>
          <p>Here is what's happening with your designs today.</p>
        </div>
        <div class="header-actions">
          <a routerLink="/designer/designs/new" class="btn-primary">Create New Design</a>
        </div>
      </header>

      <section class="metrics-section">
        <div class="metric">
          <span class="value">{{ metrics.total }}</span>
          <span class="label">Total Designs</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric">
          <span class="value">{{ metrics.published }}</span>
          <span class="label">Published</span>
        </div>
        <div class="metric-divider"></div>
        <div class="metric">
          <span class="value">{{ metrics.drafts }}</span>
          <span class="label">Drafts</span>
        </div>
      </section>

      <section class="recent-designs">
        <div class="section-header">
          <h2>Recent Designs</h2>
          <a routerLink="/designer/designs" class="view-all">View all</a>
        </div>
        
        <div class="designs-grid">
          <app-design-card *ngFor="let design of recentDesigns" [design]="design"></app-design-card>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .eyebrow {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      display: block;
    }
    .header-content h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-earth);
    }
    .header-content p {
      color: rgba(44, 42, 41, 0.6);
      font-size: 1.1rem;
    }
    
    .metrics-section {
      display: flex;
      align-items: center;
      padding: 2rem 0;
      border-top: 1px solid rgba(44, 42, 41, 0.1);
      border-bottom: 1px solid rgba(44, 42, 41, 0.1);
      gap: 3rem;
    }
    .metric {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .metric .value {
      font-family: var(--font-serif);
      font-size: 2.5rem;
      color: var(--color-earth);
      line-height: 1;
    }
    .metric .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(44, 42, 41, 0.5);
    }
    .metric-divider {
      width: 1px;
      height: 40px;
      background-color: rgba(44, 42, 41, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5rem;
    }
    .section-header h2 {
      font-size: 1.5rem;
      color: var(--color-earth);
    }
    .view-all {
      color: var(--color-gold);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    .view-all:hover {
      color: var(--color-earth);
    }
    .designs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }
      .metrics-section {
        gap: 1.5rem;
      }
    }
  `]
})
export class DashboardComponent {
  user = this.authService.currentUser;
  metrics = MOCK_METRICS;
  // Show only up to 3 recent designs on dashboard
  recentDesigns = MOCK_DESIGNS.slice(0, 3);

  constructor(private authService: AuthService) {}
}
