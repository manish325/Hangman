import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationItem } from 'src/app/core/models/admin.model';
import { NotificationService } from 'src/app/core/services/admin/notification/notification.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  navigationOptions : INavigationItem[] = [];
  currentlyOn : string = 'leader-board'
  currentUser : string = '';
  constructor(private router : Router, private authService : AuthService, public notificationService : NotificationService){
    this.navigationOptions = [
      {
        name : 'LeaderBoard',
        icon : 'home',
        routerPath : 'leader-board'
      },
      {
        name : 'Categories',
        icon : 'home',
        routerPath : 'categories'
      },
      {
        name : 'Tournaments',
        icon : 'home',
        routerPath : 'tournaments'
      },
      {
        name : 'Players',
        icon : 'home',
        routerPath : 'players'
      },
      {
        name : 'Gifts',
        icon : 'home',
        routerPath : 'gifts'
      }
    ];
    this.currentUser = `${authService.getUserDetails()?.username.split(' ')[0]?.[0]}${authService.getUserDetails()?.username.split(' ')[1]?.[0] || ''}`.toUpperCase()
    router.navigate(['admin', 'leader-board'])
  }

  logout() {
    this.authService.logout();
  }
}
