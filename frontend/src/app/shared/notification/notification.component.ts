import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INotification } from 'src/app/core/models/notification';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from "@angular/material/menu";
import { MatDividerModule } from '@angular/material/divider';

const material = [
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDividerModule
]

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, ...material],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() notification !: INotification;
    @Output() notificationAction = new EventEmitter()
    constructor() {}

    emitNotificationAction (action : 1|0) {
      this.notificationAction.emit({
        notification : this.notification, action : action
      })
    }
}
