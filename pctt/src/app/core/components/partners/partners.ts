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


export interface PartnerElement {
 id: number;
 status: string;
 hostingType: string;
 alias: string;
 queueName: string;
 application: string;
 description: string;
}

@Component({
  selector: 'app-partners',
  standalone: false,
  templateUrl: './partners.html',
  styleUrl: './partners.scss'
})
export class Partners implements OnInit {

constructor(private translate: TranslateService) {
}

ngOnInit() {
this.dbData = [ {id: 1, status: "ACTIVE", hostingType: "MQ", alias: "al1", queueName: "DIR_FLXTW094", application: "N/A", description: "toto"},
                                           ];
  this.dataSource.data = this.dbData;
}


  displayedColumns: string[] = ['id', 'status', 'hostingType', 'alias', 'queueName', 'application', 'description', 'actions'];
  dataSource = new MatTableDataSource<PartnerElement>([]);
  dbData : PartnerElement[] = [];

  element = signal({});


  sequenceId: number = 1;

    readonly dialog = inject(MatDialog);
    private _snackBar = inject(MatSnackBar);

    openFormDialog(id?: number): void {

          this.element = signal({
            status: "ACTIVE"
          });
          if(id) {
            let item = this.dbData.find(i => i.id === id);
            if(item) {
              this.element.set(Object.assign({}, item));
            }
          }
          const dialogRef = this.dialog.open(PartnerFormDialog, {
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
                  this.dbData.push(clone);
                  this.dataSource.data = this.dbData;
                  console.log(this.dataSource);
                } else {
                  let item = this.dbData.find(i => i.id === id);
                  if(item) {
                    item.status = clone.status;
                    item.hostingType = clone.hostingType;
                    item.alias = clone.alias;
                    item.queueName = clone.queueName;
                    item.application = clone.application;
                    item.description = clone.description;
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
  selector: 'app-partners-form-dialog',
  standalone: false,
  templateUrl: 'partners-dialog.html'
})
export class PartnerFormDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PartnerFormDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

    readonly element = model(this.data.element);

  loading: boolean = false;
  hostingTypes: string[] = ["MQ", "DIRECTORY", "PRINTER", "S3"];


  ngOnInit() {
    if(this.element && this.element() && this.element().queueName)
      this.buildHostingTypes(this.element().queueName);
  }

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

    onChangeQueue(value: string) : void {
      this.buildHostingTypes(value);
    }

    buildHostingTypes(queueName ?: string) {
      this.hostingTypes = ["MQ", "DIRECTORY", "PRINTER", "S3"];
      if(queueName === "MQ_FROM_PAP_MSG" || queueName === 'DIR_FLXTW094')
        this.hostingTypes = ["DIRECTORY", "MQ"];
      else if (queueName === "MQ_FROM_KEMM_WWIL_MSG")
        this.hostingTypes = ["S3"];
    }
}
