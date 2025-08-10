import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Timetable} from 'src/app/shared/models/timetable.model';
@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
})
export class EventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
