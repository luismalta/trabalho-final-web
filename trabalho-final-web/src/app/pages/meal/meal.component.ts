import { Component, OnInit } from '@angular/core';
import { Meal } from './meal'
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  

  constructor(protected alertService: AlertService) { }

  mainItens = ['Arroz', 'Lentilha']
  meatItens = ['Bisteca', 'Frango', 'Carne de panela']
  sideDishItens = ['Pure de batata', 'Salpicão']
  cart = []
  mealOption = new Meal('', '', '')
  mealQunty = 1
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};


  addCart(meal, mealQunty){
    console.log(meal + " - " + mealQunty)


    var item = {
      item: meal,
      qunty: mealQunty,

    }

    item.item.name = 'Refeição'
    item.item.price = 10.0

    if(meal == '' || mealQunty == '' || mealQunty == 0){
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
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    console.log(this.cart)
  }

}
