import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategories } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { AddCategoryComponent } from 'src/app/modules/admin/components/dialogs/add-category/add-category.component';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.scss']
})
export class AddTournamentComponent implements OnInit {
    categories : ICategories[] = [];
    tournamentForm = new FormGroup({
      tournamentName : new FormControl('', Validators.required),
      tournamentDetails : new FormControl('', Validators.required),
      tournamentCategory : new FormControl('', Validators.required),
      words : new FormArray([]),
      tournamentPrizes : new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required)
      ], Validators.minLength(3))
    });
    constructor(
      public dialogRef: MatDialogRef<AddCategoryComponent>,
      private categoryService : CategoryService,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.addWord();
    }

    ngOnInit(): void {
      this.getCateories()
    }

    addWord() {
      const wordFormGroup = new FormGroup({
        word : new FormControl('' ,Validators.required),
        hint : new FormControl('', Validators.required)
      });
      (this.tournamentForm.get('words') as FormArray).push(wordFormGroup)
    }

    deleteWord(index : number) {
      (this.tournamentForm.get('words') as FormArray).controls = (this.tournamentForm.get('words') as FormArray).controls.filter((control, i)=>i!=index);
      console.log(this.tournamentForm.value)
    }

    submitForm() {
      if(this.tournamentForm.valid) {
        console.log(this.tournamentForm.value);
        this.dialogRef.close(this.tournamentForm.value)
      }
    }

    getCateories() {
      const payload : IPagination = {
        searchText :  '',
        pageSize : 1000,
        pageNumber : 0,
        sortManner : 1,
        status : true
      }

      this.categoryService.getAllCategories(payload).subscribe({
        next : (response : IResponse<ICategories>)=>{
            this.categories = response.data;
        }
      })
    }
}
