import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any = {}
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // if (!this.currentUser) {
    //   this.router.navigate(['/login']);
    // }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}