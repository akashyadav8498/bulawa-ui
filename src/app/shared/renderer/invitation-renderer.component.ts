import { Component, Input, OnInit, Type, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorStateService } from '../../core/services/editor-state.service';
import { InvitationContent, SectionConfig, ThemeConfig } from '../../core/models/invitation.model';
import { HeroComponent } from './components/hero.component';
import { InvitationMessageComponent } from './components/invitation-message.component';
import { EventsComponent } from './components/events.component';
import { CoupleStoryComponent } from './components/couple-story.component';
import { GalleryComponent } from './components/gallery.component';
import { VenueComponent } from './components/venue.component';
import { ImportantDetailsComponent } from './components/important-details.component';
import { RsvpComponent } from './components/rsvp.component';
import { CountdownComponent } from './components/countdown.component';
import { FooterComponent } from './components/footer.component';

@Component({
  selector: 'app-invitation-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="invitation-renderer-container">
      <ng-container *ngFor="let section of content?.sections">
        <div class="section-wrapper" 
             [id]="'section-' + section.id"
             [class.selected]="selectedSectionId === section.id"
             (click)="selectSection(section.id, $event)">
          <ng-container *ComponentOutlet="getComponentForType(section.type); inputs: { config: section, theme: content?.theme }"></ng-container>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .invitation-renderer-container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .section-wrapper {
      position: relative;
      width: 100%;
    }
  `]
})
export class InvitationRendererComponent {
  @Input() content!: InvitationContent;
  
  private editorState = inject(EditorStateService);
  
  get selectedSectionId() {
    return this.editorState.selectedSection()?.id;
  }

  selectSection(id: string, event: Event) {
    event.stopPropagation();
    this.editorState.selectSection(id);
  }

  getComponentForType(type: string): Type<any> {
    switch (type) {
      case 'hero': return HeroComponent;
      case 'invitation-message': return InvitationMessageComponent;
      case 'events': return EventsComponent;
      case 'couple-story': return CoupleStoryComponent;
      case 'gallery': return GalleryComponent;
      case 'venue': return VenueComponent;
      case 'important-details': return ImportantDetailsComponent;
      case 'rsvp': return RsvpComponent;
      case 'countdown': return CountdownComponent;
      case 'footer': return FooterComponent;
      default: throw new Error(`Unknown section type: ${type}`);
    }
  }
}
