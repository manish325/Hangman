import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getAllCategories(payload : IPagination) : Observable<IResponse<ICategories>> {
      return this.http.post('admin/categories/getAllCategories', payload) as Observable<IResponse<ICategories>>;
  }

  addCategory(category : ICategories) {
      return this.http.post('admin/categories/addCategory', category);
  }

  updateCategory(category : ICategories) {
    return this.http.put(`admin/categories/updateCategory/${category.categoryId}`, category)
  }

  changeCategoryStatus(category : ICategories) {
    return this.http.delete(`admin/categories/changeCategoryStatus/${category.categoryId}`);
  }
}
