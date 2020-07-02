import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { AlertService } from '../../_alert';
import { Router, ActivatedRoute } from '@angular/router';
import { Sale } from 'src/app/sale';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html',
  styleUrls: ['./revenues.component.css']
})
export class RevenuesComponent implements OnInit {

  sales: Array<Sale> = []
  user = {} as User;
  _id = '';
  password2 = '';
  admin = false;
  sale = {} as Sale;
  id_recebido = '';
  total = 0; 
  total_perda = 0;
  total_ganho = 0;
  
  constructor(protected alertService: AlertService, private router: Router) { }

  userId = sessionStorage.getItem('userId')
  ngOnInit(): void {
    this.getInfo();
    this.getSales();
  }

  calcTotal(){
    var total = 0; 
    var total_perda = 0;
    var total_ganho = 0;
    this.sales.forEach(element => {
      if(element.received === false){
        total_perda += element.totalPrice;
      }
      total +=  element.totalPrice;
    });
    total_ganho = total - total_perda;
    console.log(total_perda);
    console.log(total);
    console.log(total_ganho);
  }

  changeRecebido(){
    this.sales.forEach(element => {
      if(element._id === this.id_recebido){
        element.received = false;
      }
    });
  }

  optDia(){
    this.router.navigate(['/configuration']);
  }

  getSales(){
    fetch('http://localhost:3000/getSales',{
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        responseJson.forEach(element => {
          this.sales.push(element);
        });
      })
      .catch((error) => {
        console.error(error);
      });

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
