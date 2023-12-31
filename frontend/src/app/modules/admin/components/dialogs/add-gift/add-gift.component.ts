import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GiftService } from 'src/app/core/services/admin/gifts/gift.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { IGifts } from 'src/app/core/models/admin.model';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {
  giftForm = new FormGroup({
    giftName : new FormControl('', Validators.required),
    giftValue : new FormControl('', Validators.required),
    quantity : new FormControl('', Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService : GiftService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if(this.data.mode === 'edit')
    this.giftForm.patchValue(this.data.gift)
  }

  onSubmit() {
    if(this.giftForm.valid) {
      const gift : IGifts = this.giftForm.value as IGifts;
      if(this.data.mode === 'edit'){
        gift.giftId = this.data.gift.giftId
      }
      this.dialogRef.close({
        giftData : gift
      })
    }
  }
}
