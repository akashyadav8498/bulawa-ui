import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MOCK_DESIGNS, DesignItem } from './designer.mock';
import { DesignCardComponent } from './components/design-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-designer-designs',
  standalone: true,
  imports: [CommonModule, RouterModule, DesignCardComponent, FormsModule],
  template: `
    <div class="designs-page animate-fade-up">
      <header class="page-header">
        <div class="header-content">
          <h1>My Designs</h1>
          <p>Manage and organize your invitation templates.</p>
        </div>
        <div class="header-actions">
          <a routerLink="/designer/designs/new" class="btn-primary">Create New Design</a>
        </div>
      </header>

      <div class="filters-bar">
        <div class="search-box">
          <span class="icon">⌕</span>
          <input type="text" placeholder="Search designs..." [(ngModel)]="searchQuery" (input)="filterDesigns()" />
        </div>
        <div class="filter-group">
          <select [(ngModel)]="statusFilter" (change)="filterDesigns()">
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Drafts</option>
          </select>
        </div>
      </div>

      <div class="designs-grid" *ngIf="filteredDesigns.length > 0; else emptyState">
        <app-design-card 
          *ngFor="let design of filteredDesigns" 
          [design]="design"
        ></app-design-card>
      </div>
      
      <ng-template #emptyState>
        <div class="empty-state">
          <div class="empty-icon">✧</div>
          <h3>No designs found</h3>
          <p>Get started by creating your first invitation template.</p>
          <a routerLink="/designer/designs/new" class="btn-primary">Create New Design</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .designs-page {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-content h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: var(--color-earth);
    }
    .header-content p {
      color: rgba(44, 42, 41, 0.6);
      font-size: 1.1rem;
    }
    
    .filters-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(44, 42, 41, 0.1);
    }
    .search-box {
      position: relative;
      width: 300px;
    }
    .search-box .icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(44, 42, 41, 0.4);
      font-size: 1.2rem;
    }
    .search-box input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid var(--color-gray-light);
      border-radius: 4px;
      font-family: inherit;
      background: var(--color-ivory);
      outline: none;
      transition: border-color 0.2s;
    }
    .search-box input:focus {
      border-color: var(--color-gold);
    }
    .filter-group select {
      padding: 0.75rem 2rem 0.75rem 1rem;
      border: 1px solid var(--color-gray-light);
      border-radius: 4px;
      font-family: inherit;
      background: var(--color-ivory);
      outline: none;
      cursor: pointer;
    }
    
    .designs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5rem 2rem;
      text-align: center;
      background: var(--color-ivory);
      border-radius: 8px;
      border: 1px dashed rgba(44, 42, 41, 0.2);
    }
    .empty-icon {
      font-size: 3rem;
      color: var(--color-gold);
      margin-bottom: 1rem;
    }
    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .empty-state p {
      color: rgba(44, 42, 41, 0.6);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }
      .filters-bar {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }
      .search-box {
        width: 100%;
      }
    }
  `]
})
export class DesignsComponent {
  allDesigns: DesignItem[] = MOCK_DESIGNS;
  filteredDesigns: DesignItem[] = [...this.allDesigns];
  
  searchQuery = '';
  statusFilter = 'All';

  filterDesigns() {
    this.filteredDesigns = this.allDesigns.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            d.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'All' || d.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
}
