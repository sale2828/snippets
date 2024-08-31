import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { CommonDialog } from "../shared/models/common-dialog.model";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  //generic dialog service that opens any mat dialog and enforces that data passed to the dialog is data model that dialog expects to get
  public open<T extends CommonDialog, D>(component: new (...args: any[]) => T & { data: D }, data: D, style?: DialogStyle): Observable<void> {
    const dialog = this.dialog.open<T>(component, {
      data,
      width: style?.width ? style.width : '500',
      minHeight: style?.minHeight ? style.minHeight : '300',
    });

    return dialog.componentInstance.confirmed.asObservable();
  }
}

export interface DialogStyle {
  width: string;
  height: string;
  minHeight: string;
  minWidth: string;
}
