import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-couple-story',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="couple-story-wrapper" [ngStyle]="themeStyles">
      <div class="content-container">
        <h2>{{ config?.label || 'couple-story' }}</h2>
      </div>
    </div>`,
  styleUrls: ['./couple-story.component.scss']
})
export class CoupleStoryComponent {
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

