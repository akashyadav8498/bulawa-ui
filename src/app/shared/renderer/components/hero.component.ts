import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-wrapper" [ngStyle]="themeStyles">
      <div class="hero-background" [style.backgroundImage]="'url(' + config?.data?.backgroundImage + ')'"></div>
      <div class="hero-overlay" [style.opacity]="(config?.data?.overlayOpacity || 30) / 100"></div>
      
      <div class="hero-content" [ngClass]="config?.data?.alignment || 'center'">
        <div class="eyebrow">{{ config?.data?.eyebrow }}</div>
        <h1 class="title">{{ config?.data?.title }}</h1>
        <div class="date">{{ config?.data?.date }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
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
