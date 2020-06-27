import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { NgForm } from '@angular/forms';
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
  
  constructor() {

  }

  ngOnInit(){
  }

  registerUser() {
    console.log(this.user);
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
      })
      .catch((error) => {
        console.error(error);
      });
  }


}
