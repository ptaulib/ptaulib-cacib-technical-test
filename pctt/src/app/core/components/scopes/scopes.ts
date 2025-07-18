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

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { TranslateService } from '@ngx-translate/core';

export interface ScopeElement {
 id: number;
 rank: number;
 nom: string;
 description: string;
 commentaire: string;
 condition: number;
}

@Component({
  selector: 'app-scopes',
  standalone: false,
  templateUrl: './scopes.html',
  styleUrl: './scopes.scss'
})
export class Scopes implements OnInit {

constructor(private translate: TranslateService) {
}

ngOnInit() {
this.dbData = [ {id: 1, rank: 1, nom: "NAME", description: "desc", commentaire: "cmt", condition: 5},
                                           ];
  this.dataSource.data = this.dbData;
}

  displayedColumns: string[] = ['id', 'rank', 'nom', 'description', 'commentaire', 'condition', 'actions'];
  dataSource = new MatTableDataSource<ScopeElement>([]);
  dbData : ScopeElement[] = [];

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
        const dialogRef = this.dialog.open(ScopeFormDialog, {
          data: {element: this.element()}
        });



        dialogRef.afterClosed().subscribe(result => {
          dialogRef.componentInstance.loading = true;
            console.log("result", result);
            if(result) {
              this.element();
              let clone = Object.assign({}, result);
              if(!id) {
                clone.id = ++ this.sequenceId;
                clone.rank = clone.id;
                this.dbData.push(clone);
                this.dataSource.data = this.dbData;
                console.log(this.dataSource);
              } else {
                let item = this.dbData.find(i => i.id === id);
                if(item) {
                  item.nom = clone.description;
                  item.description = clone.nom;
                  item.commentaire = clone.commentaire;
                  item.condition = clone.condition;
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


@Component({
  selector: 'app-scope-form-dialog',
  standalone: false,
  templateUrl: 'scope-dialog.html'
})
export class ScopeFormDialog {
  readonly dialogRef = inject(MatDialogRef<ScopeFormDialog>);
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
