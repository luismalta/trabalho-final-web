import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css'],
})
export class DrinkComponent implements OnInit {
  public token: string;
  private url = 'http://localhost:3000/item/drink';
  user = {} as User;

  constructor() { }

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
    console.log(this.cart)
    this.cart.push(item)
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
    console.log(this.cart)

  }

  ngOnInit(): void {
    this.getDrinks()

    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
