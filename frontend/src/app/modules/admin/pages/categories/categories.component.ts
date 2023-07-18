import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategories } from 'src/app/core/models/admin.model';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { AddCategoryComponent } from '../../components/dialogs/add-category/add-category.component';
import { IAction } from 'src/app/core/models/action';
import { FormControl } from '@angular/forms';
import { IPagination } from 'src/app/core/models/paginator';
import { IResponse } from 'src/app/core/models/auth.models';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {debounceTime} from "rxjs";
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = [
    'categoryName',
    'categoryDetails',
    'action'
  ];
  dataSource: ICategories[] = [];
  useColumns: string[] = [
    'Category',
    'Details'
  ];

  searchCategory  = new FormControl('');
  pageNumber : number = 0;
  status : boolean = true;
  sortManner : 0 | 1 = 1;
  totalCount : number = 0;
  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.categorySearch();
  }

  getAllCategories() {
    const payload : IPagination = {
      searchText : this.searchCategory.value || '',
      pageSize : 10,
      pageNumber : this.pageNumber,
      sortManner : this.sortManner,
      status : this.status
    }
    this.categoryService.getAllCategories(payload).subscribe({
      next: (response: IResponse<ICategories>) => {
        // alert(response.message)
        this.totalCount = response.totalCount;
        // alert(this.totalCount)
        this.dataSource = response.data;
      },
      error: (response?: any) => {
        // alert('something went wrong')
      }
    })
  }

  openCategoryDialog(mode: 'add' | 'edit', data?: ICategories) {
    this.dialog.open(AddCategoryComponent, {
      data: {
        mode,
        category: data
      }
    }).afterClosed().subscribe({
      next: () => {
        this.getAllCategories();
      }
    })
  }

  openConfirmationDialog(category: ICategories) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: category
    }).afterClosed().subscribe({
      next: (response ? : any) => {
        if(response==='yes') {
          this.categoryService.changeCategoryStatus(category).subscribe({
            next : (response ? : any)=>{
              this.getAllCategories();
            }
          })
        }
      }
    })
  }

  handleAction(event: IAction<ICategories>) {
    if (event.actionType === 'edit')
      this.openCategoryDialog('edit', event.element);
    else if (event.actionType === 'delete') {
      this.openConfirmationDialog(event.element);
    }
  }

  categorySearch() {
    this.searchCategory.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe({
      next : (value)=>{
        // if(value) {
          this.getAllCategories();
        // }
      }
    })
  }

  handleTabChange(event : MatTabChangeEvent) {
    this.pageNumber = 0;
    switch(event.index) {
      case 0 : 
      this.status = true;
      this.getAllCategories();
      break;
      case 1 : 
      this.status = false;
      this.getAllCategories();
      break;
    }
  }

  handlePagination(pageDetails : IPagination) {
    this.pageNumber = pageDetails.pageNumber || 0;
    this.getAllCategories();
  }
}

