import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesignItem } from '../designer.mock';

@Component({
  selector: 'app-design-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="design-card group">
      <div class="image-wrapper">
        <img [src]="design.image" [alt]="design.name" />
        <div class="status-badge" [ngClass]="design.status.toLowerCase()">
          {{ design.status }}
        </div>
        
        <div class="overlay-actions">
          <a [routerLink]="['/designer/studio', design.id]" class="btn-primary btn-sm">Edit</a>
          <button class="btn-icon" title="Preview" (click)="onPreview()"><span class="icon">👁</span></button>
          <button class="btn-icon" title="More Actions" (click)="onMore()"><span class="icon">⋮</span></button>
        </div>
      </div>
      
      <div class="meta">
        <div class="title-row">
          <h3 class="name">{{ design.name }}</h3>
          <span class="category">{{ design.category }}</span>
        </div>
        <div class="details-row">
          <span class="date">Edited {{ design.lastEdited | date:'MMM d, y' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .design-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .image-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 130%; /* Editorial portrait ratio */
      background-color: var(--color-gray-light);
      border-radius: 4px;
      overflow: hidden;
    }
    .image-wrapper img {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
    }
    .design-card:hover .image-wrapper img {
      transform: scale(1.03);
    }
    .status-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      background: var(--color-white);
      color: var(--color-earth);
      z-index: 10;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    .status-badge.published {
      background: var(--color-gold);
      color: var(--color-white);
    }
    .overlay-actions {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(44, 42, 41, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-out);
      z-index: 5;
    }
    .design-card:hover .overlay-actions {
      opacity: 1;
    }
    .btn-sm {
      padding: 0.5rem 1.5rem;
      font-size: 0.75rem;
    }
    .btn-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-white);
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-earth);
      transition: all var(--duration-normal);
    }
    .btn-icon:hover {
      background: var(--color-gold);
      color: var(--color-white);
    }
    .meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
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
    }
    .date {
      font-size: 0.8rem;
      color: rgba(44, 42, 41, 0.6);
    }
  `]
})
export class DesignCardComponent {
  @Input() design!: DesignItem;
  @Output() preview = new EventEmitter<void>();
  @Output() more = new EventEmitter<void>();

  onPreview() { this.preview.emit(); }
  onMore() { this.more.emit(); }
}
