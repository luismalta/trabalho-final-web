import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MealComponent } from './pages/meal/meal.component';
import { DrinkComponent } from './pages/drink/drink.component';
import { DessertComponent } from './pages/dessert/dessert.component';
import { CartComponent } from './pages/cart/cart.component';
import { RevenuesComponent } from './pages/revenues/revenues.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MealComponent,
    DrinkComponent,
    DessertComponent,
    CartComponent,
    RevenuesComponent,
    ConfigurationComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
