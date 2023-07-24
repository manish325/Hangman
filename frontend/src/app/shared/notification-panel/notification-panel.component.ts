import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotificationService } from 'src/app/core/services/admin/notification/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { INotification, mockNotifications } from 'src/app/core/models/notification';
import { MatIconModule } from '@angular/material/icon';
import { IResponse } from 'src/app/core/models/auth.models';

const material = [
  MatSidenavModule,
  MatIconModule
]

@Component({
  selector: 'app-notification-panel',
  standalone: true,
  imports: [CommonModule, ...material, NotificationComponent],
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss']
})
export class NotificationPanelComponent implements OnInit {
  notifications : INotification[] = [...mockNotifications];
  constructor(public notificationService : NotificationService) {}
  ngOnInit(): void {
    this.getAllNotifications()
  }

  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next : (response : IResponse<INotification>)=>{
        this.notifications = response.data;
      }
    })
  }

  notificationAction(event : any) {
    console.log(event)
  }
}
