import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGifts } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http : HttpClient) { }

  getAllGifts(payload : IPagination) : Observable<IResponse<IGifts>> {
      return this.http.post('admin/gifts/getAllGifts', payload) as Observable<IResponse<IGifts>>;
  }

  updateGift(gift : IGifts) {

  }

  changeGiftStatus(gift : IGifts) {
    return this.http.delete(`admin/gifts/changeGiftStatus/${gift.giftId}`)
  }

  addGift(gift : IGifts) {
      return this.http.post('admin/gifts/addGift', gift)
  }
}
