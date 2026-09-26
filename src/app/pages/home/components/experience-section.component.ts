import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="experience">
      <div class="container">
        <div class="layout">
          <div class="image-col">
            <div class="image-wrapper">
              <img [src]="data.image" alt="Experience Bulawa" />
            </div>
          </div>
          <div class="content-col">
            <h2 class="headline">{{ data.headline }}</h2>
            <div class="features">
              <div class="feature" *ngFor="let feat of data.features; let i = index">
                <div class="feat-number">0{{ i + 1 }}</div>
                <div class="feat-text">
                  <h3>{{ feat.title }}</h3>
                  <p>{{ feat.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      padding: var(--space-xxl) 0;
      background-color: var(--color-earth);
      color: var(--color-ivory);
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-xl);
      align-items: center;
    }
    .image-wrapper {
      position: relative;
      padding-bottom: 120%;
      overflow: hidden;
      border-radius: 2px;
    }
    .image-wrapper img {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
    }
    .headline {
      color: var(--color-gold);
      font-size: clamp(2.5rem, 4vw, 4rem);
      margin-bottom: var(--space-xl);
      max-width: 400px;
    }
    .features {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }
    .feature {
      display: flex;
      gap: var(--space-md);
      align-items: flex-start;
    }
    .feat-number {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      color: var(--color-gold-muted);
      border-bottom: 1px solid var(--color-gold-muted);
      padding-bottom: 0.2rem;
      line-height: 1;
    }
    .feat-text h3 {
      color: var(--color-ivory);
      font-family: var(--font-sans);
      font-size: 1.125rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.5rem;
    }
    .feat-text p {
      color: rgba(250, 248, 245, 0.7);
      font-size: 1rem;
      max-width: 320px;
    }
    
    @media (max-width: 992px) {
      .layout {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }
      .image-col {
        order: 2;
      }
      .content-col {
        order: 1;
      }
      .headline {
        max-width: 100%;
      }
    }
  `]
})
export class ExperienceSectionComponent {
  @Input() data: any;
}
