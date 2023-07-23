import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  score : number = 0;

  constructor ( 
  public dialogRef: MatDialogRef<ScoreComponent>,  
  @Inject(MAT_DIALOG_DATA) public data: {
    totalScore : number
  },
  ) {
    this.score = this.data.totalScore
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
