import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.scss']
})
export class ChooseRoleComponent {
  roleChoosen : boolean = false;
  roles : string[] = []
  constructor(private authService : AuthService, private router : Router) {
    this.roles = authService.getUserDetails()?.roles || [];
  }

  routeToRole(role : string) {
    switch(role) {
      case 'ADMIN' : 
        this.router.navigate(['admin']);
      break;
      case 'PLAYER' : 
      this.router.navigate(['player'])
      break;
    }
  }

  setCurrentRole(role : string) {
    this.authService.setCurrentRole(role.toLowerCase());
    this.routeToRole(role)
  }
}
