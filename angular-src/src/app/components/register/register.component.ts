import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert alert-dismissible alert-danger', timeout: 5000 })
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Email is not valid', { cssClass: 'alert alert-dismissible alert-danger', timeout: 5000 })
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessagesService.show('You are registered successfully', { cssClass: 'alert alert-dismissible alert-success', timeout: 5000 })
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong', { cssClass: 'alert alert-dismissible alert-danger', timeout: 5000 })
        this.router.navigate(['/register']);
      }
    });
  }

}
