import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Profile } from './core/components/profile/profile';
import { Scopes } from './core/components/scopes/scopes';
import { Partners } from './core/components/partners/partners';

const routes: Routes = [
  { path: 'profile', component: Profile },
  { path: 'scopes', component: Scopes },
  { path: 'partners', component: Partners }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
