import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Router, ActivatedRoute } from '@angular/router';

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
  private url = 'http://localhost:3000/updateUser';

  constructor(private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.name = params.name;
      this.user.email = params.email;
      this.user.admin = params.admin;
      this.user.address = params.address;
      this.user.phone = params.phone;
      this.user.password = params.password;
      this._id = params._id;
    });
    console.log(this._id)
  }

  editInfo(){
    this.read = false;
    this.edit = true;
  }

  updateInfo() {
    console.log(this.user);
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
