import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor() { }

  cart = JSON.parse(sessionStorage.getItem('cart'))

  ngOnInit(): void {
    console.log(this.cart)
  }

}
