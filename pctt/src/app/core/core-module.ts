import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared-module';

import { Profile } from './components/profile/profile';
import { Scopes, ScopeFormDialog} from './components/scopes/scopes';
import { Partners, PartnerFormDialog } from './components/partners/partners';

import { ProfileDialog } from './components/profile/profile-dialog/profile-dialog';


@NgModule({
  declarations: [
    Profile,
    Scopes,
    Partners,
    ScopeFormDialog,
    PartnerFormDialog,
    ProfileDialog
  ],
  imports: [
    CommonModule, SharedModule
  ],
  exports: [CommonModule, SharedModule, Profile, Scopes, Partners, ScopeFormDialog, PartnerFormDialog]
})
export class CoreModule {
  constructor() {
      console.log('CoreModule on')
    }
}
