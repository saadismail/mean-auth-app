import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
      private validateService: ValidateService,
      private authService: AuthService,
      private flashMessageService: FlashMessagesService,
      private router: Router
    ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateLogin(user)) {
      this.flashMessageService.show("Fill all the details.", { cssClass: 'alert alert-dismissible alert-danger', timeout: 5000 });
      return false;
    }
    
    // Authenticate
    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if (!data.success) {
        this.flashMessageService.show(data.msg, { cssClass: 'alert alert-dismissible alert-danger', timeout: 5000 });
        return false;
      } else {
        this.flashMessageService.show(data.msg, { cssClass: 'alert alert-dismissible alert-success', timeout: 5000 });
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
      }
    })

  }
}
