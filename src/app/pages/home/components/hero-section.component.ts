import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  template: `
    <section class="hero">
      <header class="header container animate-fade-up">
        <div class="logo">
          <img src="assets/logo.jpeg" alt="Bulawa Logo" />
        </div>
        <nav class="nav">
          <a href="/login" class="nav-link">Log In</a>
          <a href="/designer" class="btn-primary">Designer Studio</a>
        </nav>
      </header>
      
      <div class="container hero-content">
        <div class="text-content">
          <span class="eyebrow animate-fade-up delay-1">{{ data.eyebrow }}</span>
          <h1 class="headline animate-fade-up delay-2">{{ data.headline }}</h1>
          <p class="subheadline animate-fade-up delay-3">{{ data.subheadline }}</p>
          <div class="actions animate-fade-up delay-3">
            <a href="/designer/designs" class="btn-primary">{{ data.primaryCta }}</a>
            <a href="/designer" class="btn-secondary">{{ data.secondaryCta }}</a>
          </div>
        </div>
        <div class="image-content animate-fade-up delay-2">
          <div class="image-wrapper">
            <img [src]="data.image" [alt]="data.imageAlt" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      padding-bottom: var(--space-xl);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }
    .logo img {
      height: 32px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .nav-link {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: color var(--duration-normal);
      &:hover {
        color: var(--color-gold);
      }
    }
    .hero-content {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
      align-items: center;
      margin-top: var(--space-lg);
    }
    .eyebrow {
      display: block;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-gold);
      margin-bottom: var(--space-sm);
    }
    .headline {
      font-size: clamp(3rem, 5vw, 5rem);
      margin-bottom: var(--space-md);
      max-width: 600px;
    }
    .subheadline {
      font-size: 1.125rem;
      color: var(--color-earth);
      opacity: 0.8;
      max-width: 480px;
      margin-bottom: var(--space-lg);
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 120%; /* 5:6 aspect ratio */
      overflow: hidden;
      border-radius: 4px;
    }
    .image-wrapper img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 992px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: var(--space-md);
        margin-top: var(--space-md);
      }
      .actions {
        flex-direction: column;
      }
      .actions .btn-primary, .actions .btn-secondary {
        width: 100%;
      }
      .image-content {
        margin-top: var(--space-md);
      }
    }
  `]
})
export class HeroSectionComponent {
  @Input() data: any;
}
