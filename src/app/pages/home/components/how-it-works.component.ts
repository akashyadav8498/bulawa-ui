import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="how-it-works">
      <div class="container">
        <h2 class="title">{{ data.title }}</h2>
        <div class="steps">
          <div class="step" *ngFor="let step of data.steps">
            <span class="step-number">{{ step.number }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .how-it-works {
      padding: var(--space-xxl) 0;
      background-color: var(--color-ivory);
    }
    .title {
      font-size: clamp(2rem, 3vw, 3rem);
      margin-bottom: var(--space-xl);
      text-align: center;
    }
    .steps {
      display: flex;
      justify-content: space-between;
      max-width: 1000px;
      margin: 0 auto;
    }
    .step {
      text-align: center;
      flex: 1;
      padding: 0 var(--space-md);
      position: relative;
    }
    .step:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 30px;
      right: 0;
      width: 50%;
      height: 1px;
      background-color: var(--color-gold-muted);
      z-index: 1;
    }
    .step-number {
      display: block;
      font-family: var(--font-serif);
      font-size: 3rem;
      color: var(--color-gold);
      margin-bottom: var(--space-sm);
      position: relative;
      z-index: 2;
      background-color: var(--color-ivory);
      display: inline-block;
      padding: 0 1rem;
    }
    .step-title {
      font-family: var(--font-sans);
      font-size: 1.25rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 400;
    }
    
    @media (max-width: 768px) {
      .steps {
        flex-direction: column;
        gap: var(--space-xl);
      }
      .step:not(:last-child)::after {
        display: none;
      }
    }
  `]
})
export class HowItWorksComponent {
  @Input() data: any;
}
