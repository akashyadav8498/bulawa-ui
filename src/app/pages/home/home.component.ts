import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section.component';
import { FeaturedDesignsComponent } from './components/featured-designs.component';
import { ExperienceSectionComponent } from './components/experience-section.component';
import { DesignerCTAComponent } from './components/designer-cta.component';
import { HowItWorksComponent } from './components/how-it-works.component';
import { FinalCTAComponent } from './components/final-cta.component';
import { FooterComponent } from './components/footer.component';
import { HOME_DATA } from './home.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    FeaturedDesignsComponent,
    ExperienceSectionComponent,
    DesignerCTAComponent,
    HowItWorksComponent,
    FinalCTAComponent,
    FooterComponent
  ],
  template: `
    <main class="home-page">
      <app-hero-section [data]="data.hero"></app-hero-section>
      <app-featured-designs [data]="data.featured"></app-featured-designs>
      <app-experience-section [data]="data.experience"></app-experience-section>
      <app-designer-cta [data]="data.designer"></app-designer-cta>
      <app-how-it-works [data]="data.howItWorks"></app-how-it-works>
      <app-final-cta [data]="data.finalCta"></app-final-cta>
      <app-footer [data]="data.footer"></app-footer>
    </main>
  `
})
export class HomeComponent {
  data = HOME_DATA;
}
