import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-designs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="featured">
      <div class="container">
        <h2 class="title">{{ data.title }}</h2>
        
        <div class="grid">
          <div class="item" *ngFor="let item of data.items; let i = index" [ngClass]="'item-' + i">
            <div class="image-container">
              <img [src]="item.image" [alt]="item.name" />
              <div class="overlay">
                <span class="category">{{ item.category }}</span>
              </div>
            </div>
            <div class="meta">
              <h3>{{ item.name }}</h3>
              <a href="#" class="view-link">View Template →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .featured {
      padding: var(--space-xxl) 0;
      background-color: var(--color-white);
    }
    .title {
      font-size: clamp(2rem, 3vw, 3rem);
      margin-bottom: var(--space-xl);
      text-align: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--space-md);
      align-items: center;
    }
    .item {
      position: relative;
    }
    /* Asymmetrical Layout */
    .item-0 {
      grid-column: 1 / 8;
    }
    .item-1 {
      grid-column: 9 / 13;
      margin-top: 20%;
    }
    .item-2 {
      grid-column: 3 / 11;
      margin-top: var(--space-xl);
    }
    
    .image-container {
      position: relative;
      overflow: hidden;
      margin-bottom: var(--space-sm);
    }
    .item-0 .image-container { padding-bottom: 70%; }
    .item-1 .image-container { padding-bottom: 130%; }
    .item-2 .image-container { padding-bottom: 50%; }
    
    .image-container img {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
    }
    
    .overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(44, 42, 41, 0.2);
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-out);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .category {
      color: var(--color-white);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 0.75rem;
      border: 1px solid var(--color-white);
      padding: 0.5rem 1rem;
      transform: translateY(10px);
      transition: transform var(--duration-normal) var(--ease-out);
    }
    
    .item:hover .image-container img {
      transform: scale(1.03);
    }
    .item:hover .overlay {
      opacity: 1;
    }
    .item:hover .category {
      transform: translateY(0);
    }
    
    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .meta h3 {
      font-size: 1.5rem;
    }
    .view-link {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-gold);
    }
    
    @media (max-width: 992px) {
      .grid {
        display: flex;
        flex-direction: column;
        gap: var(--space-xl);
      }
      .item-0, .item-1, .item-2 {
        margin-top: 0;
      }
      .image-container {
        padding-bottom: 100% !important;
      }
    }
  `]
})
export class FeaturedDesignsComponent {
  @Input() data: any;
}
