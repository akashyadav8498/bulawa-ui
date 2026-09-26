import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inv-wrapper" [ngStyle]="themeStyles">
      <div class="inv-content" [ngClass]="config?.data?.alignment || 'center'">
        <div class="ornament">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <p class="message">{{ config?.data?.message }}</p>
        <div class="family">{{ config?.data?.family }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./invitation-message.component.scss']
})
export class InvitationMessageComponent {
  @Input() config: any;
  @Input() theme: any;

  get themeStyles() {
    if (!this.theme) return {};
    return {
      '--primary-color': this.theme.primaryColor,
      '--secondary-color': this.theme.secondaryColor,
      '--accent-color': this.theme.accentColor,
      '--bg-color': this.theme.backgroundColor,
      '--text-color': this.theme.textColor,
      '--heading-font': this.theme.headingFont,
      '--body-font': this.theme.bodyFont,
    };
  }
}
