import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venue',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="venue-wrapper" [ngStyle]="themeStyles">
      <div class="content-container">
        <h2>{{ config?.label || 'venue' }}</h2>
      </div>
    </div>`,
  styleUrls: ['./venue.component.scss']
})
export class VenueComponent {
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

