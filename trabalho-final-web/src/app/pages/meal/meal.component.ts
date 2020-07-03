import { Component, OnInit } from '@angular/core';
import { Meal } from './meal'
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  
  private url = 'http://localhost:3000/daily';

  constructor(protected alertService: AlertService) { }

  mainItens = []
  meatItens = []
  sideDishItens = []
  cart = []
  mealOption = new Meal('', '', '')
  mealQunty = 1
  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

isLoaded = false

  getMeals(): Promise<any> {
    fetch(this.url,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.mainItens = responseJson[0]['rice']
        this.meatItens = responseJson[0]['meat']
        this.sideDishItens = responseJson[0]['plus']
        console.log(responseJson)
        return responseJson
      })
      .catch((error) => {
        console.error(error);
        return error
      });
      return
  }


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

  async ngOnInit(): Promise<any> {
    if (JSON.parse(sessionStorage.getItem('cart')) != null){
      this.cart = JSON.parse(sessionStorage.getItem('cart'))
    }
    this.getMeals()
    console.log(this.mainItens)
    console.log(this.cart)
  }

}
