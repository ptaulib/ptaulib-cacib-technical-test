import { Component, inject, model, signal, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


import {MatTableDataSource} from '@angular/material/table';

import {FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-profile-dialog',
  standalone: false,
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.scss'

})
export class ProfileDialog {

  readonly dialogRef = inject(MatDialogRef<ProfileDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  readonly element = model(this.data.element);
  loading: boolean = false;

  onNoClick(): void {
    this.loading = false;
    this.dialogRef.close();
  }

  save(): void {
    this.loading = true;
    setTimeout(() => {
      this.dialogRef.close(this.element());
    }, 2000);
  }

}
