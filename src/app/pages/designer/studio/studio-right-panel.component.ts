import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorStateService } from '../../../core/services/editor-state.service';

@Component({
  selector: 'app-studio-right-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="panel-header">
      <h3>Inspector</h3>
    </div>
    
    <div class="panel-content" *ngIf="selectedSection() as section; else emptyState">
      
      <!-- HERO -->
      <div *ngIf="section.type === 'hero'" class="inspector-group">
        <label>Eyebrow</label>
        <input type="text" [ngModel]="section.data.eyebrow" (ngModelChange)="updateData('eyebrow', $event)" />
        
        <label>Title</label>
        <input type="text" [ngModel]="section.data.title" (ngModelChange)="updateData('title', $event)" />
        
        <label>Date</label>
        <input type="text" [ngModel]="section.data.date" (ngModelChange)="updateData('date', $event)" />
        
        <label>Background Image URL</label>
        <input type="text" [ngModel]="section.data.backgroundImage" (ngModelChange)="updateData('backgroundImage', $event)" />
      </div>

      <!-- INVITATION MESSAGE -->
      <div *ngIf="section.type === 'invitation-message'" class="inspector-group">
        <label>Message</label>
        <textarea [ngModel]="section.data.message" (ngModelChange)="updateData('message', $event)"></textarea>
        
        <label>Family / Signature</label>
        <input type="text" [ngModel]="section.data.family" (ngModelChange)="updateData('family', $event)" />
      </div>

      <!-- EVENTS -->
      <div *ngIf="section.type === 'events'" class="inspector-group">
        <h4>Events List</h4>
        <div class="list-item" *ngFor="let ev of section.data.events; let i = index">
          <input type="text" [ngModel]="ev.title" (ngModelChange)="updateEvent(i, 'title', $event)" placeholder="Event Title" />
          <input type="text" [ngModel]="ev.date" (ngModelChange)="updateEvent(i, 'date', $event)" placeholder="Date" />
        </div>
      </div>

      <!-- COUPLE STORY -->
      <div *ngIf="section.type === 'couple-story'" class="inspector-group">
        <label>Heading</label>
        <input type="text" [ngModel]="section.data.heading" (ngModelChange)="updateData('heading', $event)" />
        <label>Story Text</label>
        <textarea [ngModel]="section.data.text" (ngModelChange)="updateData('text', $event)"></textarea>
      </div>

      <!-- GALLERY -->
      <div *ngIf="section.type === 'gallery'" class="inspector-group">
        <h4>Images</h4>
        <div class="list-item" *ngFor="let img of section.data.images; let i = index">
          <input type="text" [ngModel]="img.url" (ngModelChange)="updateGallery(i, 'url', $event)" placeholder="Image URL" />
        </div>
      </div>

      <!-- VENUE -->
      <div *ngIf="section.type === 'venue'" class="inspector-group">
        <label>Venue Name</label>
        <input type="text" [ngModel]="section.data.venueName" (ngModelChange)="updateData('venueName', $event)" />
        <label>Address</label>
        <textarea [ngModel]="section.data.address" (ngModelChange)="updateData('address', $event)"></textarea>
      </div>

      <!-- IMPORTANT DETAILS -->
      <div *ngIf="section.type === 'important-details'" class="inspector-group">
        <h4>Information Blocks</h4>
        <div class="list-item" *ngFor="let item of section.data.items; let i = index">
          <input type="text" [ngModel]="item.title" (ngModelChange)="updateInfo(i, 'title', $event)" placeholder="Title" />
          <input type="text" [ngModel]="item.description" (ngModelChange)="updateInfo(i, 'description', $event)" placeholder="Description" />
        </div>
      </div>
      
      <!-- RSVP -->
      <div *ngIf="section.type === 'rsvp'" class="inspector-group">
        <label>Heading</label>
        <input type="text" [ngModel]="section.data.heading" (ngModelChange)="updateData('heading', $event)" />
        <label>Deadline</label>
        <input type="text" [ngModel]="section.data.deadline" (ngModelChange)="updateData('deadline', $event)" />
      </div>

      <!-- FOOTER -->
      <div *ngIf="section.type === 'footer'" class="inspector-group">
        <label>Footer Text</label>
        <input type="text" [ngModel]="section.data.text" (ngModelChange)="updateData('text', $event)" />
      </div>

    </div>
    
    <ng-template #emptyState>
      <div class="empty-state">
        <p>Select a section on the canvas to edit its properties.</p>
      </div>
    </ng-template>
  `,
  styleUrls: ['./studio-right-panel.component.scss']
})
export class StudioRightPanelComponent {
  private editorState = inject(EditorStateService);
  
  selectedSection = this.editorState.selectedSection;

  updateData(key: string, value: any) {
    const section = this.selectedSection();
    if (section) {
      this.editorState.updateSectionData(section.id, { [key]: value });
    }
  }

  updateEvent(index: number, key: string, value: any) {
    const section = this.selectedSection();
    if (section && section.type === 'events') {
      const events = [...section.data.events];
      events[index] = { ...events[index], [key]: value };
      this.editorState.updateSectionData(section.id, { events });
    }
  }

  updateGallery(index: number, key: string, value: any) {
    const section = this.selectedSection();
    if (section && section.type === 'gallery') {
      const images = [...section.data.images];
      images[index] = { ...images[index], [key]: value };
      this.editorState.updateSectionData(section.id, { images });
    }
  }

  updateInfo(index: number, key: string, value: any) {
    const section = this.selectedSection();
    if (section && section.type === 'important-details') {
      const items = [...section.data.items];
      items[index] = { ...items[index], [key]: value };
      this.editorState.updateSectionData(section.id, { items });
    }
  }
}
