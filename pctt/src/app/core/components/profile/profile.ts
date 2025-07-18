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

import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {ProfileDialog} from './profile-dialog/profile-dialog';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { TranslateService } from '@ngx-translate/core';

export interface ProfileElement {
 id: number;
 code: string;
 description: string;
 creation_date: string;
 updated_date: string;
 last_updated_user_id: number;
}

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {


constructor(private translate: TranslateService) {
}

ngOnInit() {
this.dbData = [ {id: 1, code: "ADMIN", description: "Administrateur", creation_date: new Date().toLocaleString(), updated_date: new Date().toLocaleString(), last_updated_user_id: 5},
                                           ];
  this.dataSource.data = this.dbData;
}

  displayedColumns: string[] = ['id', 'code', 'description', 'creation_date', 'updated_date', 'last_updated_user_id', 'actions'];
  dataSource = new MatTableDataSource<ProfileElement>([]);
  dbData : ProfileElement[] = [];
  sequenceId: number = 1;

  element = signal({});

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  openFormDialog(id?: number): void {

      this.element = signal({});
      if(id) {
        let item = this.dbData.find(i => i.id === id);
        if(item) {
          this.element.set(Object.assign({}, item));
        }
      }
      const dialogRef = this.dialog.open(ProfileDialog, {
        data: {element: this.element()}
      });



      dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.loading = true;
          console.log("result", result);
          if(result) {
            let clone = Object.assign({}, result);
            if(!id) {
              clone.id = ++ this.sequenceId;
              clone.creation_date = new Date().toLocaleString();
              clone.updated_date = new Date().toLocaleString();
              clone.last_updated_user_id = 0;
              this.dbData.push(clone);
              this.dataSource.data = this.dbData;
              console.log(this.dataSource);
            } else {
              let item = this.dbData.find(i => i.id === id);
              if(item) {
                item.code = clone.code;
                item.description = clone.description;
                item.last_updated_user_id = 0;
                item.updated_date = new Date().toLocaleString();
                this.dataSource.data = this.dbData;
              }
            }
            this.openSnackBar();
           }
           this.element = signal({});
      });
    }

    async openSnackBar() {
      const saved_successfully = await this.translate.get('saved_successfully').toPromise();
      const close = await this.translate.get('close').toPromise();
      this._snackBar.open(saved_successfully, close, {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
}
