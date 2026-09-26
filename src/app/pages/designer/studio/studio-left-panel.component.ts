import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { EditorStateService } from '../../../core/services/editor-state.service';
import { SectionConfig, SectionType } from '../../../core/models/invitation.model';

@Component({
  selector: 'app-studio-left-panel',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `
    <div class="panel-header">
      <div class="tabs">
        <button [class.active]="activeTab === 'layers'" (click)="activeTab = 'layers'">Layers</button>
        <button [class.active]="activeTab === 'insert'" (click)="activeTab = 'insert'">Insert</button>
      </div>
    </div>
    
    <div class="panel-content">
      <!-- LAYERS TAB -->
      <div *ngIf="activeTab === 'layers'" class="layers-list" cdkDropList (cdkDropListDropped)="drop($event)">
        <div *ngFor="let section of sections(); let i = index" 
             class="layer-item" 
             [class.selected]="selectedSectionId() === section.id"
             (click)="selectSection(section.id)"
             cdkDrag>
             
          <div class="drag-handle" cdkDragHandle>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </div>
          
          <div class="layer-label">{{ section.label }}</div>
          
          <div class="layer-actions">
            <button class="action-btn" (click)="duplicateSection(section.id, $event)" title="Duplicate">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
            <button class="action-btn delete" (click)="deleteSection(section.id, $event)" title="Delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            </button>
          </div>
          
          <div *cdkDragPreview class="drag-preview">{{ section.label }}</div>
        </div>
      </div>

      <!-- INSERT TAB -->
      <div *ngIf="activeTab === 'insert'" class="insert-list">
        <div *ngFor="let block of availableBlocks" class="insert-item" (click)="addSection(block)">
          <div class="block-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>
          </div>
          <div class="block-label">{{ block.label }}</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./studio-left-panel.component.scss']
})
export class StudioLeftPanelComponent {
  private editorState = inject(EditorStateService);
  
  activeTab: 'layers' | 'insert' = 'layers';
  sections = this.editorState.sections;
  
  get selectedSectionId() {
    return () => this.editorState.selectedSection()?.id;
  }

  availableBlocks: { type: SectionType, label: string }[] = [
    { type: 'hero', label: 'Hero' },
    { type: 'invitation-message', label: 'Invitation' },
    { type: 'events', label: 'Events' },
    { type: 'couple-story', label: 'Couple Story' },
    { type: 'gallery', label: 'Gallery' },
    { type: 'venue', label: 'Venue' },
    { type: 'important-details', label: 'Important Details' },
    { type: 'rsvp', label: 'RSVP' },
    { type: 'countdown', label: 'Countdown' },
    { type: 'footer', label: 'Footer' },
  ];

  selectSection(id: string) {
    this.editorState.selectSection(id);
  }

  duplicateSection(id: string, event: Event) {
    event.stopPropagation();
    this.editorState.duplicateSection(id);
  }

  deleteSection(id: string, event: Event) {
    event.stopPropagation();
    this.editorState.deleteSection(id);
  }

  addSection(block: { type: SectionType, label: string }) {
    const newSection: SectionConfig = {
      id: this.editorState.generateId(),
      type: block.type,
      label: block.label,
      data: {}
    };
    this.editorState.addSection(newSection);
    this.activeTab = 'layers';
  }

  drop(event: CdkDragDrop<any[]>) {
    this.editorState.reorderSections(event.previousIndex, event.currentIndex);
  }
}
