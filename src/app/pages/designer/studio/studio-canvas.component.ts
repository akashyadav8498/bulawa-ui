import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorStateService } from '../../../core/services/editor-state.service';
import { InvitationRendererComponent } from '../../../shared/renderer/invitation-renderer.component';

@Component({
  selector: 'app-studio-canvas',
  standalone: true,
  imports: [CommonModule, InvitationRendererComponent],
  template: `
    <div class="canvas-wrapper" [ngClass]="viewport()">
      <div class="canvas-frame">
        <app-invitation-renderer *ngIf="invitation()" [content]="invitation()!"></app-invitation-renderer>
      </div>
    </div>
  `,
  styleUrls: ['./studio-canvas.component.scss']
})
export class StudioCanvasComponent {
  private editorState = inject(EditorStateService);
  
  invitation = this.editorState.invitation;
  viewport = this.editorState.currentViewport;
}
