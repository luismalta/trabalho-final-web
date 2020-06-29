import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component'
import { ConfigurationComponent } from './pages/configuration/configuration.component'
import { DessertComponent } from './pages/dessert/dessert.component'
import { DrinkComponent } from './pages/drink/drink.component'
import { LoginComponent } from './pages/login/login.component'
import { MainComponent } from './pages/main/main.component'
import { RegisterComponent} from './pages/register/register.component'
import { MealComponent } from './pages/meal/meal.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'meal', component: MealComponent },
  { path: 'drink', component: DrinkComponent },
  { path: 'dessert', component: DessertComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
