import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICategories } from 'src/app/core/models/admin.model';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit{
  categoryForm = new FormGroup({
    categoryName : new FormControl('', Validators.required),
    categoryDetails : new FormControl('', Validators.required)
  })
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService : CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    switch(this.data.mode) {
      case 'add' : 
      break;
      case 'edit' : 
        this.patchValues();
      break;
    }
  }

  patchValues() {
    this.categoryForm.get('categoryName')?.patchValue(this.data.category.categoryName);
    this.categoryForm.get('categoryDetails')?.patchValue(this.data.category.categoryDetails);
  }

  onSubmit() {
    switch(this.data.mode) {
      case 'add' : 
      this.categoryService.addCategory(this.categoryForm.value as ICategories).subscribe({
        next : (response : any)=>{
          // alert(response.message);
          this.dialogRef.close();
        }, 
        error : (response : any)=>{
          // alert(response.message);
        }
      })
      break;
      case 'edit' : 
      const categoryToUpdate = {
        categoryId : this.data.category.categoryId,
        ...this.categoryForm.value
      }
      this.categoryService.updateCategory(categoryToUpdate as ICategories).subscribe({
        next : (response : any)=>{
          // alert(response.message);
          this.dialogRef.close();
        }, 
        error : (response : any)=>{
          // alert(response.message);
        }
      })
      break;
    }
  }
}
