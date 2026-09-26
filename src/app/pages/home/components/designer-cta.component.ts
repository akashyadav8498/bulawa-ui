import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-designer-cta',
  standalone: true,
  template: `
    <section class="designer-cta">
      <div class="container text-center">
        <h2 class="headline">{{ data.headline }}</h2>
        <p class="description">{{ data.description }}</p>
        <a href="/designer" class="btn-primary">{{ data.cta }}</a>
      </div>
    </section>
  `,
  styles: [`
    .designer-cta {
      padding: var(--space-xxl) 0;
      background-color: var(--color-gray-light);
    }
    .text-center {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .headline {
      font-size: clamp(2.5rem, 4vw, 4rem);
      margin-bottom: var(--space-md);
      color: var(--color-earth);
    }
    .description {
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto var(--space-lg);
      color: rgba(44, 42, 41, 0.8);
    }
  `]
})
export class DesignerCTAComponent {
  @Input() data: any;
}
