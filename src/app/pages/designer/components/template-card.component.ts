import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateItem } from '../designer.mock';

@Component({
  selector: 'app-template-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a [routerLink]="['/designer/studio', 'new-' + template.id]" class="template-card group">
      <div class="image-wrapper" [class.is-blank]="template.isBlank">
        <ng-container *ngIf="!template.isBlank; else blankState">
          <img [src]="template.image" [alt]="template.name" />
        </ng-container>
        <ng-template #blankState>
          <div class="blank-indicator">+</div>
        </ng-template>
        
        <div class="overlay">
          <span class="btn-primary btn-sm">Use Template</span>
        </div>
      </div>
      
      <div class="meta">
        <h3 class="name">{{ template.name }}</h3>
        <span class="category">{{ template.category }}</span>
        <p class="description">{{ template.description }}</p>
      </div>
    </a>
  `,
  styles: [`
    .template-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      cursor: pointer;
      text-decoration: none;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 130%;
      background-color: var(--color-gray-light);
      border-radius: 4px;
      overflow: hidden;
      border: 1px solid rgba(44, 42, 41, 0.05);
    }
    .image-wrapper img {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
    }
    .template-card:hover .image-wrapper img {
      transform: scale(1.03);
    }
    .is-blank {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-ivory);
      border: 1px dashed rgba(44, 42, 41, 0.2);
    }
    .blank-indicator {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      font-weight: 300;
      color: var(--color-gold);
    }
    .overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(44, 42, 41, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-out);
      z-index: 5;
    }
    .template-card:hover .overlay {
      opacity: 1;
    }
    .btn-sm {
      padding: 0.5rem 1.5rem;
      font-size: 0.75rem;
      pointer-events: none; /* Let link handle click */
    }
    .meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .name {
      font-family: var(--font-serif);
      font-size: 1.25rem;
      color: var(--color-earth);
      margin: 0;
    }
    .category {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-gold);
      margin-bottom: 0.25rem;
    }
    .description {
      font-size: 0.85rem;
      color: rgba(44, 42, 41, 0.7);
      line-height: 1.4;
    }
  `]
})
export class TemplateCardComponent {
  @Input() template!: TemplateItem;
}
