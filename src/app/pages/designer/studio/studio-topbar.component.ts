import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorStateService } from '../../../core/services/editor-state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-studio-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <a routerLink="/designer" class="back-btn" title="Back to Dashboard">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </a>
        <div class="logo">BULAWA</div>
        <div class="divider"></div>
        <span class="design-name">{{ invitation()?.templateId || 'Untitled Design' }}</span>
        <span class="save-state">All changes saved</span>
      </div>

      <div class="topbar-center">
        <div class="viewport-toggles">
          <button [class.active]="viewport() === 'desktop'" (click)="setViewport('desktop')" title="Desktop">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </button>
          <button [class.active]="viewport() === 'tablet'" (click)="setViewport('tablet')" title="Tablet">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
          <button [class.active]="viewport() === 'mobile'" (click)="setViewport('mobile')" title="Mobile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div class="topbar-right">
        <button class="icon-btn" (click)="undo()" [disabled]="!canUndo()" title="Undo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/></svg>
        </button>
        <button class="icon-btn" (click)="redo()" [disabled]="!canRedo()" title="Redo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/></svg>
        </button>
        <div class="divider"></div>
        <button class="publish-btn">Publish</button>
        <div class="avatar">CD</div>
      </div>
    </header>
  `,
  styleUrls: ['./studio-topbar.component.scss']
})
export class StudioTopbarComponent {
  private editorState = inject(EditorStateService);

  invitation = this.editorState.invitation;
  viewport = this.editorState.currentViewport;

  setViewport(mode: 'desktop' | 'tablet' | 'mobile') {
    this.editorState.setViewport(mode);
  }

  undo() { this.editorState.undo(); }
  redo() { this.editorState.redo(); }
  canUndo() { return this.editorState.canUndo(); }
  canRedo() { return this.editorState.canRedo(); }
}
