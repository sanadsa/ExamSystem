import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any = {}
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {
<<<<<<< HEAD
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
=======
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // if (!this.currentUser) {
    //   this.router.navigate(['/login']);
    // }
>>>>>>> 753f792cf80c48c3a36ecbbd1d9e0e7c244f951c
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
