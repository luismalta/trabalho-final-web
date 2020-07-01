import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/sale'
import { SaleLine } from 'src/app/sale-line'
import { Item } from 'src/app/item';
import { User } from 'src/app/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cart = []
  totalPrice = 0.0
  user = {} as User;
  url = 'http://localhost:3000/sale'


  calculateTotal(){
    var totalPrice = 0.0
    this.cart.forEach( function (item){
      totalPrice += item.item.price * item.qunty
    })
    this.totalPrice = totalPrice
  }

  placeOrder(){
    console.log("Pedido realizado")
    console.log(this.cart)
    var sale = this.mountSaleLines()
    sale['user'] = this.user.name
    sale['date'] = new Date()
    sale['received'] = false
    
    fetch(this.url,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sale)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  mountSaleLines(){
    var linesArray = []
    var totalPrice = 0.0
    this.cart.forEach(function (line){
      var name = line.item.name
      var category = line.item.category
      var price = line.item.price
      var qunty = line. qunty
      var item = new Item(name, category, price)
      var saleLine = new SaleLine(item, qunty)
      linesArray.push(saleLine)

      totalPrice += (price * qunty)
    })

    return {saleLines: linesArray, totalPrice: totalPrice}
  }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)

    this.calculateTotal()
  }

}
