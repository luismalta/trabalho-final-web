import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css'],
})
export class DrinkComponent implements OnInit {
  public token: string;
  private url = 'http://localhost:3000/item/Bebidas';
  user = {} as User;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(protected alertService: AlertService) { }

  cart = []
  drinkOption = ''
  drinkQunty = 1
  drinks = []

  getDrinks() {
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
        this.drinks = responseJson
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addCart(drink, drinkQunty){
    console.log(drink + " - " + drinkQunty)
    var drinkItem = ''
    console.log(this.drinks)
    this.drinks.forEach(function (value){
      if (value._id == drink){
        drinkItem = value
      }
    })
    var item = {
      item: drinkItem,
      qunty: drinkQunty,

    }

    if(drink == '' || drinkQunty == '' || drinkQunty == 0){
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
    this.getDrinks()

    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
