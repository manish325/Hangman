import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/core/models/auth.models';
import { INotification } from 'src/app/core/models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public isNotificationPanelOpen : boolean = false;
  constructor(private http : HttpClient) { }

  getAllNotifications() : Observable<IResponse<INotification>> {
    return this.http.get('admin/requests/getAllRequests') as Observable<IResponse<INotification>>;
  }

  manageTournamentRequest () {

  }

  manageGiftRequest() {

  }
}
