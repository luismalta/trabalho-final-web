import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent implements OnInit {
  public token: string;
  private url = 'http://localhost:3000/item/Sobremesa';
  user = {} as User;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(protected alertService: AlertService) { }

  cart = []
  dessertOption = ''
  dessertQunty = 1
  desserts = []

  getDesserts() {
    console.log(this.user);
    fetch(this.url,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.desserts = responseJson
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addCart(dessert, dessertQunty){
    console.log(dessert + " - " + dessertQunty)
    var dessertItem = ''
    this.desserts.forEach(function (value){
      if (value._id == dessert){
        dessertItem = value
      }
    })
    var item = {
      item: dessertItem,
      qunty: dessertQunty,

    }
    if(dessert == '' || dessertQunty == '' || dessertQunty == 0){
      this.alertService.error('Selecione um item e uma quantidade válida!', this.options)
    } else {
      console.log(this.cart)
      this.cart.push(item)
      sessionStorage.setItem('cart', JSON.stringify(this.cart))
      console.log(this.cart)

      this.alertService.success('Item adicionado ao Carrinho!', this.options)
    }
  }
  

  ngOnInit(): void {
    this.getDesserts()
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
