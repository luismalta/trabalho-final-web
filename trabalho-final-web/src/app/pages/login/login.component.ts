import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public token: string;
  private url = 'http://localhost:3000/login';
  user = {} as User;

  // constructor(private http: HttpClient) {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   this.token = currentUser && currentUser.token;

  // }

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  public getToken(): string {
    return this.token;
  }

  loginAuth() {
    console.log(this.user);
    fetch(this.url,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: this.user.password,
        email: this.user.email,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        sessionStorage.setItem('userId', responseJson[0]._id);
        window.location.reload()
        this.router.navigate([''], {
          state: {data: responseJson[0]}
       });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // loginAuth(email: string, senha: string): Observable<any> {
  //   return this.http.post<any>(this.url, { email: email, senha: senha })
  //     .pipe(
  //       map(user => {
  //         // login bem-sucedido se houver um token jwt na resposta
  //         if (user && user.token) {
  //           // armazenar detalhes do usuário e token jwt no localStorage para manter o usuário logado entre as atualizações da página
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //         }

  //         return user;
  //       })
  //     );
  // }

  // logout(): void {
  //   // Limpa o token removendo o usuário do local store para efetuar o logout
  //   this.token = null;
  //   localStorage.removeItem('currentUser');
  // }
}

