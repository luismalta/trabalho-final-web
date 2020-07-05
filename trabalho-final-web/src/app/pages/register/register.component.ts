import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../_alert';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private url = 'http://localhost:3000/createUser';
  user = {} as User;
  password2 = '';

  constructor(private router: Router, protected alertService: AlertService) {

  }

  ngOnInit(){
  }

  registerUser() {
    if(!this.user.name || !this.user.address || !this.user.email || !this.user.phone || !this.user.password || this.user.password !== this.password2){
      this.alertService.error('Preencha corretamente os campos', {
        autoClose: true,
        keepAfterRouteChange: false
    });

    } else {
      fetch(this.url,{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          admin: false,
          address: this.user.address, 
          phone: this.user.phone
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.router.navigate(['/login'], {
         });
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }


}
