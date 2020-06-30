import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  cart = []
  totalPrice = 0.0


  calculateTotal(){
    var totalPrice = 0.0
    this.cart.forEach( function (item){
      totalPrice += item.item.price * item.qunty
    })
    this.totalPrice = totalPrice
  }

  placeOrder(){
    console.log("Pedido realizado")
  }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)

    this.calculateTotal()
  }

}
