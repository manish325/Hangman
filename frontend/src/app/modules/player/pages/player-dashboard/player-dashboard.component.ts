import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationItem } from 'src/app/core/models/admin.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-player-dashboard',
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.scss']
})
export class PlayerDashboardComponent {
  navigationOptions : INavigationItem[] = []
  playerName : string = '';
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
    this.playerName = authService.getUserDetails()?.username || '';
    router.navigate(['player', 'tournaments'])
  }

  logout() {
    this.authService.logout();
  }
}
