import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="logo-col">
            <img src="assets/logo.jpeg" alt="Bulawa Logo" class="footer-logo" />
          </div>
          <div class="links-col">
            <a *ngFor="let link of data.links" [href]="link.url">{{ link.label }}</a>
          </div>
          <div class="social-col">
            <a *ngFor="let link of data.social" [href]="link.url">{{ link.label }}</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 Bulawa. All rights reserved.</p>
          <div class="legal-links">
            <a *ngFor="let link of data.legal" [href]="link.url">{{ link.label }}</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--color-earth);
      color: rgba(250, 248, 245, 0.6);
      padding: var(--space-lg) 0 var(--space-md);
      border-top: 1px solid rgba(250, 248, 245, 0.1);
      font-size: 0.875rem;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--space-xl);
      margin-bottom: var(--space-xl);
    }
    .footer-logo {
      height: 24px;
      opacity: 0.8;
    }
    .links-col, .social-col {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .links-col a, .social-col a {
      transition: color var(--duration-normal);
    }
    .links-col a:hover, .social-col a:hover {
      color: var(--color-gold);
    }
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--space-md);
      border-top: 1px solid rgba(250, 248, 245, 0.1);
    }
    .legal-links {
      display: flex;
      gap: 2rem;
    }
    .legal-links a:hover {
      color: var(--color-gold);
    }
    
    @media (max-width: 768px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: var(--space-md);
      }
      .footer-bottom {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  @Input() data: any;
}
