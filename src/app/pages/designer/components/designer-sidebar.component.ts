import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-designer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <a routerLink="/" class="logo-link">
          <img src="assets/logo.jpeg" alt="Bulawa Logo" class="logo" />
        </a>
      </div>
      
      <nav class="sidebar-nav">
        <a routerLink="/designer" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <span class="icon">⊞</span> Overview
        </a>
        <a routerLink="/designer/designs" routerLinkActive="active" class="nav-item">
          <span class="icon">◇</span> My Designs
        </a>
        <a routerLink="/designer/designs/new" routerLinkActive="active" class="nav-item">
          <span class="icon">+</span> Templates
        </a>
        <a routerLink="/designer/profile" routerLinkActive="active" class="nav-item">
          <span class="icon">○</span> Profile
        </a>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-info" *ngIf="user()">
          <div class="avatar">{{ user()?.firstName?.charAt(0) }}{{ user()?.lastName?.charAt(0) }}</div>
          <div class="user-details">
            <span class="name">{{ user()?.firstName }} {{ user()?.lastName }}</span>
            <span class="role">Designer</span>
          </div>
        </div>
        <button class="logout-btn" (click)="logout()">
          <span class="icon">↪</span> Log Out
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      height: 100vh;
      background-color: var(--color-ivory);
      border-right: 1px solid rgba(44, 42, 41, 0.1);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
    }
    .sidebar-header {
      padding: 2rem 2rem 1.5rem;
    }
    .logo {
      height: 28px;
    }
    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem 1rem;
      gap: 0.25rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      color: rgba(44, 42, 41, 0.7);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 400;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .nav-item .icon {
      font-size: 1.1rem;
      opacity: 0.7;
    }
    .nav-item:hover {
      background-color: rgba(44, 42, 41, 0.03);
      color: var(--color-earth);
    }
    .nav-item.active {
      background-color: rgba(44, 42, 41, 0.05);
      color: var(--color-earth);
      font-weight: 500;
    }
    .nav-item.active .icon {
      opacity: 1;
      color: var(--color-gold);
    }
    
    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(44, 42, 41, 0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--color-earth);
      color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.05em;
    }
    .user-details {
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-earth);
    }
    .role {
      font-size: 0.75rem;
      color: var(--color-gold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: none;
      border: none;
      color: rgba(44, 42, 41, 0.6);
      font-size: 0.85rem;
      cursor: pointer;
      padding: 0.5rem 0;
      text-align: left;
      font-family: inherit;
      transition: color 0.2s;
    }
    .logout-btn:hover {
      color: var(--color-earth);
    }
    
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        height: auto;
        position: static;
        border-right: none;
        border-bottom: 1px solid rgba(44, 42, 41, 0.1);
      }
      .sidebar-nav {
        flex-direction: row;
        overflow-x: auto;
        padding: 0.5rem 1rem;
      }
      .nav-item {
        white-space: nowrap;
      }
      .sidebar-footer {
        display: none; /* Hide on mobile header, maybe move to a menu */
      }
    }
  `]
})
export class DesignerSidebarComponent {
  user = this.authService.currentUser;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe(() => {
      window.location.href = '/login';
    });
  }
}
