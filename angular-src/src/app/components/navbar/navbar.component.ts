import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.authService.isLoggedIn());
  }

  onLogoutClick() {
    this.flashMessagesService.show("You have been logged out.", {cssClass: "alert alert-success", timeout: 3000});
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
