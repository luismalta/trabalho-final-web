import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rango Express';

  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    // this.router.navigate(['/main']);
    // localStorage.setItem('cart', JSON.stringify([]))
  }
}
