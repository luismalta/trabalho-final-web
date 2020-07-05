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

  isLogged = false

  handleLogin(){
    var userId = sessionStorage.getItem('userId')
    console.log(this.isLogged)
    if(userId && !this.isLogged){
      this.isLogged = true
    }
  }

  logout(){
    sessionStorage.removeItem('userId')
    this.router.navigate(['/main']);
    window.location.reload()
  }

  login(){

  }

  ngOnInit() {
    this.handleLogin()
  }
}
