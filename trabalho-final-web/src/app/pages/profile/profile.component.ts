import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginComponent} from '../login/login.component';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  read = true;
  edit = false;
  user = {} as User;
  _id = '';
  password2 = '';
  private url = 'http://localhost:3000/updateUser';
  
  userId = sessionStorage.getItem('userId')

 
  constructor(private route: ActivatedRoute, private router: Router, protected alertService: AlertService) { 

  }

  ngOnInit() {
    this.getInfo();
  }

  getInfo(){
    fetch('http://localhost:3000/getUser',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.userId,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.user.name = responseJson[0].name;
        this.user.email = responseJson[0].email;
        this.user.admin = responseJson[0].admin;
        this.user.address = responseJson[0].address;
        this.user.phone = responseJson[0].phone;
        this.user.password = responseJson[0].password;
        this._id = responseJson[0]._id;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  editInfo(){
    this.read = false;
    this.edit = true;
  }

  updateInfo() {
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
        _id: this._id,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        address: this.user.address, 
        phone: this.user.phone
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        // this.router.navigate(['/login']);
        this.read = true;
        this.edit = false;

      })
      .catch((error) => {
        console.error(error);
      });
  }
  }

}
