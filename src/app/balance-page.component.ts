import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { FeaturesSectionComponent } from './features-section.component';

@Component({
  selector: 'bob-balance-page',
  template: `
    <bob-balance-section></bob-balance-section>
    <bob-features-section></bob-features-section>
  `,
  standalone: true,
  imports: [FeaturesSectionComponent, BalanceSectionComponent],
})
export class BalancePageComponent {}
