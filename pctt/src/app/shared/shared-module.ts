import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitcher } from './components/language-switcher/language-switcher';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClientModule, HttpClient } from '@angular/common/http';

const HttpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, '../i18n/', '.json');


@NgModule({
  declarations: [
    LanguageSwitcher
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),

    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatMenuModule, MatTableModule,

    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle
  ],
  exports: [CommonModule, HttpClientModule, LanguageSwitcher, TranslateModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule, MatMenuModule, MatTableModule,

    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle
    ]
})
export class SharedModule {
  constructor() {
    console.log('SharedModule on')
  }
}
