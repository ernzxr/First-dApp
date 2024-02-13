import { Component } from '@angular/core';
import { SettingsSectionComponent } from './settings-section.component';

@Component({
  selector: 'bob-settings-page',
  template: ` <bob-settings-section></bob-settings-section>`,
  standalone: true,
  imports: [SettingsSectionComponent],
})
export class SettingsPageComponent {}
