import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { AlertService } from '../../_alert';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.css']
})
export class RevenuesComponent implements OnInit {

  sales = []
  user = {} as User;
  _id = '';
  password2 = '';
  admin = false;
  constructor(protected alertService: AlertService, private router: Router) { }

  userId = sessionStorage.getItem('userId')
  ngOnInit(): void {
    this.getInfo();
  }

  calcTotal(){

  }

  optDia(){
    this.router.navigate(['/configuration']);
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
        this.admin = responseJson[0].admin;
        this.user.address = responseJson[0].address;
        this.user.phone = responseJson[0].phone;
        this.user.password = responseJson[0].password;
        this._id = responseJson[0]._id;
      })
      .catch((error) => {
        console.error(error);
      });

      if(this.admin == false){
        this.alertService.error('Você não tem permissão para acessar essa área, procure um administrador do sistema', {
          autoClose: true,
          keepAfterRouteChange: false
      });
      }
  }

}
