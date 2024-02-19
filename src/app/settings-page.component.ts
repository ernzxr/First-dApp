import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';
import { SettingsSectionComponent } from './settings-section.component';

@Component({
  selector: 'bob-settings-page',
  template: ` <bob-settings-section></bob-settings-section>
    <bob-features-section></bob-features-section>`,
  standalone: true,
  imports: [SettingsSectionComponent, FeaturesSectionComponent],
})
export class SettingsPageComponent {}
