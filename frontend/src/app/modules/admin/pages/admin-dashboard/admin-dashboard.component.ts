import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationItem } from 'src/app/core/models/admin.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  navigationOptions : INavigationItem[] = []

  constructor(private router : Router, private authService : AuthService){
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
    router.navigate(['admin', 'gifts'])
  }

  logout() {
    this.authService.logout();
  }
}
