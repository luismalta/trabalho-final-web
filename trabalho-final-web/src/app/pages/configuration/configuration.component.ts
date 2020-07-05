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
  carneSelected = {} as Item;
  principalSelected = {} as Item;
  acompanhamentoSelected = {} as Item;
  itens_meat: Array<Item> = [];
  meatItens: Array<Item> = [];
  itens_rice: Array<Item> = [];
  riceItens: Array<Item> = [];

  itens_plus: Array<Item> = [];
  plusItens: Array<Item> = [];

  categoriesOpt: Array<String> = ["Carne", "Principal", "Acompanhamentos", "Bebidas", "Sobremesa"];

  private url = 'http://localhost:3000/getMeat';
  private url4 = 'http://localhost:3000/getRice';
  private url5 = 'http://localhost:3000/getPlus';
  private url2 = 'http://localhost:3000/createItem';
  private url3 = 'http://localhost:3000/createDaily';
  constructor(private router: Router) { }

  ngOnInit() {
    this.getMeat();
    this.getRice();
    this.getPlus();
  }

  getMeat(){
    fetch(this.url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.itens_meat = responseJson

      })
      .catch((error) => {
        console.error(error);
      });

  }

  getRice(){

      fetch(this.url4)
      .then((response) => response.json())
      .then((responseJson) => {
        this.itens_rice = responseJson

      })
      .catch((error) => {
        console.error(error);
      });

  }

  getPlus(){

      fetch(this.url5)
      .then((response) => response.json())
      .then((responseJson) => {
        this.itens_plus = responseJson

      })
      .catch((error) => {
        console.error(error);
      });
  }

  createItem() {
    console.log(this.item.category)
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
        console.log(responseJson[0])
        if(this.item.category === 'Principal'){
          console.log(this.itens_rice)
          this.itens_rice.push(this.item)
        }
        if(this.item.category == 'Carne'){
          this.itens_meat.push(this.item)
        }
        if(this.item.category == 'Acompanhamentos'){
          this.itens_plus.push(this.item)
        }
        window.location.reload()
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addItem() {
    console.log(this.carneSelected)
    this.meatItens.push(this.carneSelected);
    console.log(this.meatItens)
  }

  addRice() {
    console.log(this.principalSelected)
    this.riceItens.push(this.principalSelected);
    console.log(this.riceItens)
  }

  addPlus() {
    console.log(this.acompanhamentoSelected)
    this.plusItens.push(this.acompanhamentoSelected);
    console.log(this.plusItens)
  }

  cleanData(){
    this.plusItens = [];
    this.riceItens = [];
    this.meatItens = [];
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
        this.cleanData();
        this.router.navigate(['/revenues'], {
       });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
