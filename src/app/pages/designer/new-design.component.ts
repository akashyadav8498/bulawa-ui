import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MOCK_TEMPLATES } from './designer.mock';
import { TemplateCardComponent } from './components/template-card.component';

@Component({
  selector: 'app-designer-new-design',
  standalone: true,
  imports: [CommonModule, RouterModule, TemplateCardComponent],
  template: `
    <div class="new-design-page animate-fade-up">
      <header class="page-header">
        <a routerLink="/designer/designs" class="back-link"><span class="icon">←</span> Back to Designs</a>
        <h1>Choose a starting point</h1>
        <p>Select a template to begin or start from a blank canvas.</p>
      </header>

      <div class="templates-grid">
        <app-template-card 
          *ngFor="let template of templates" 
          [template]="template"
        ></app-template-card>
      </div>
    </div>
  `,
  styles: [`
    .new-design-page {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .page-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2rem 0;
      border-bottom: 1px solid rgba(44, 42, 41, 0.1);
    }
    .back-link {
      align-self: flex-start;
      margin-bottom: 2rem;
      text-decoration: none;
      color: rgba(44, 42, 41, 0.6);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: color 0.2s;
    }
    .back-link:hover {
      color: var(--color-earth);
    }
    .page-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-earth);
    }
    .page-header p {
      color: rgba(44, 42, 41, 0.6);
      font-size: 1.1rem;
    }
    
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2.5rem 2rem;
    }
  `]
})
export class NewDesignComponent {
  templates = MOCK_TEMPLATES;
}
