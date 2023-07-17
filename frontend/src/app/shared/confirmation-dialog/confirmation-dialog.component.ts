import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { MatButtonModule } from '@angular/material/button';

const material = [
  MatDialogModule,
  MatButtonModule
];

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, ...material],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private categoryService : CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }
  
  handleAction(action : 'yes' | 'no') {
    switch(action) {
      case 'yes' : 
      this.dialogRef.close('yes');
      break;
      case 'no' : 
      this.dialogRef.close();
      break;

    }
  }
}
