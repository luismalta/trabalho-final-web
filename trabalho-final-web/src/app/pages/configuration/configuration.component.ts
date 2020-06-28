import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  item = {} as Item;
  itens_meat: Array<Item> = [];
  meatItens: Array<Item> = [];

  itens_rice: Array<Item> = [];
  riceItens: Array<Item> = [];

  itens_plus: Array<Item> = [];
  plusItens: Array<Item> = [];

  private url = 'http://localhost:3000/getMeat';
  private url2 = 'http://localhost:3000/createItem';
  private url3 = 'http://localhost:3000/createDaily';
  constructor() { }

  ngOnInit() {
    this.getItens();
  }

  getItens(){
    fetch(this.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.itens_meat = responseJson
        console.log(this.itens_meat)
      //   this.router.navigate(['/profile'], {
      //     queryParams: responseJson[0]
      //  });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  createItem() {
    fetch(this.url2,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.item.name,
        category: this.item.category,
        price: this.item.price,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addItem() {
    console.log(this.itens_meat["name"])
    this.meatItens.push(new Item(this.itens_meat["name"], this.itens_meat["category"], this.itens_meat["price"]));
    console.log(this.meatItens)
  }

  addRice() {
    console.log(this.itens_rice["name"])
    this.riceItens.push(new Item(this.itens_rice["name"], this.itens_rice["category"], this.itens_rice["price"]));
    console.log(this.riceItens)
  }

  addPlus() {
    console.log(this.itens_plus["name"])
    this.plusItens.push(new Item(this.itens_plus["name"], this.itens_plus["category"], this.itens_plus["price"]));
    console.log(this.plusItens)
  }

  sendData(){
    fetch(this.url3,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meat: this.meatItens,
        rice: this.riceItens,
        plus: this.plusItens,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
