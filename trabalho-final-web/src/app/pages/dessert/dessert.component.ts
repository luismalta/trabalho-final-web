import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent implements OnInit {
  public token: string;
  private url = 'http://localhost:3000/item/dessert';
  user = {} as User;

  constructor() { }

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
    console.log(this.drinks)
    this.desserts.forEach(function (value){
      if (value._id == dessert){
        dessertItem = value
      }
    })
    var item = {
      item: dessertItem,
      qunty: dessertQunty,

    }
    console.log(this.cart)
    this.cart.push(item)
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
    console.log(this.cart)
  }

  ngOnInit(): void {
    this.getDesserts()
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
