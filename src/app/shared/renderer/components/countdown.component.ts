import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="countdown-wrapper" [ngStyle]="themeStyles">
      <div class="content-container">
        <h2>{{ config?.label || 'countdown' }}</h2>
      </div>
    </div>`,
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {
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

