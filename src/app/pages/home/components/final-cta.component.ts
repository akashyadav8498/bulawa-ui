import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  template: `
    <section class="final-cta">
      <div class="container text-center">
        <h2 class="headline">{{ data.headline }}</h2>
        <a href="/designer/designs" class="btn-primary">{{ data.cta }}</a>
      </div>
    </section>
  `,
  styles: [`
    .final-cta {
      padding: var(--space-xxl) 0;
      background-color: var(--color-earth);
      color: var(--color-ivory);
    }
    .text-center {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .headline {
      font-size: clamp(3rem, 5vw, 5rem);
      margin-bottom: var(--space-lg);
      max-width: 800px;
      color: var(--color-ivory);
    }
    .btn-primary {
      background-color: var(--color-gold);
      color: var(--color-white);
    }
    .btn-primary:hover {
      background-color: var(--color-white);
      color: var(--color-earth);
    }
  `]
})
export class FinalCTAComponent {
  @Input() data: any;
}
