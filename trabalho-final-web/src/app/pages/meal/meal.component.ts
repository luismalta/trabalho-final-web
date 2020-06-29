import { Component, OnInit } from '@angular/core';
import { Meal } from './meal'

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  constructor() { }

  mainItens = ['Arroz', 'Lentilha']
  meatItens = ['Bisteca', 'Frango', 'Carne de panela']
  sideDishItens = ['Pure de batata', 'Salpicão']
  cart = []
  mealOption = new Meal('', '', '')
  mealQunty = 1


  addCart(meal, mealQunty){
        console.log(meal + " - " + mealQunty)

    var item = {
      item: meal,
      qunty: mealQunty,

    }
    console.log(this.cart)
    this.cart.push(item)
    sessionStorage.setItem('cart', JSON.stringify(this.cart))
    console.log(this.cart)
  }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
