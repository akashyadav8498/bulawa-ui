import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DesignerSidebarComponent } from './components/designer-sidebar.component';

@Component({
  selector: 'app-designer-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, DesignerSidebarComponent],
  template: `
    <div class="designer-layout">
      <app-designer-sidebar></app-designer-sidebar>
      <main class="main-content">
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .designer-layout {
      display: flex;
      min-height: 100vh;
      background-color: var(--color-white);
    }
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow-y: auto;
    }
    .content-wrapper {
      padding: 3rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    @media (max-width: 1024px) {
      .content-wrapper {
        padding: 2rem;
      }
    }
    @media (max-width: 768px) {
      .designer-layout {
        flex-direction: column;
      }
      .main-content {
        height: auto;
        overflow-y: visible;
      }
      .content-wrapper {
        padding: 1.5rem;
      }
    }
  `]
})
export class DesignerComponent {}
