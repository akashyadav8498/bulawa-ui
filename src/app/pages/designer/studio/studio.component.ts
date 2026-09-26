import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudioTopbarComponent } from './studio-topbar.component';
import { StudioLeftPanelComponent } from './studio-left-panel.component';
import { StudioRightPanelComponent } from './studio-right-panel.component';
import { StudioCanvasComponent } from './studio-canvas.component';
import { EditorStateService } from '../../../core/services/editor-state.service';
import { InvitationContent } from '../../../core/models/invitation.model';
import { INITIAL_TEMPLATE } from './initial-template';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule, StudioTopbarComponent, StudioLeftPanelComponent, StudioRightPanelComponent, StudioCanvasComponent],
  template: `
    <div class="studio-layout">
      <app-studio-topbar class="studio-topbar"></app-studio-topbar>
      <div class="studio-body">
        <app-studio-left-panel class="studio-left"></app-studio-left-panel>
        <app-studio-canvas class="studio-center"></app-studio-canvas>
        <app-studio-right-panel class="studio-right"></app-studio-right-panel>
      </div>
    </div>
  `,
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private editorState = inject(EditorStateService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const localDraft = localStorage.getItem('bulawa_draft_' + id);
    
    if (localDraft) {
      this.editorState.loadInvitation(JSON.parse(localDraft));
    } else {
      // Load canonical template
      const newTemplate = { ...INITIAL_TEMPLATE, templateId: id || 'new' };
      this.editorState.loadInvitation(newTemplate as InvitationContent);
    }
  }
}
