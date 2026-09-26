import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="events-wrapper" [ngStyle]="themeStyles">
      <div class="content-container">
        <h2 class="section-title">{{ config?.label || 'Celebrations' }}</h2>
        
        <div class="events-list">
          <div class="event-card" *ngFor="let event of config?.data?.events; let i = index" [ngClass]="i % 2 === 0 ? 'layout-a' : 'layout-b'">
            <div class="event-image-placeholder">
              <span class="placeholder-text">{{ event.title.charAt(0) }}</span>
            </div>
            <div class="event-details">
              <div class="date-time">
                <span class="date">{{ event.date }}</span>
                <span class="dot">•</span>
                <span class="time">{{ event.time }}</span>
              </div>
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-desc">{{ event.description }}</p>
              
              <div class="venue-info">
                <strong>{{ event.venueName }}</strong><br/>
                <span>{{ event.address }}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  `,
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
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
