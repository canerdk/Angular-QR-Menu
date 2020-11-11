import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './Pages/product/product.component';
import {HomeComponent} from './Pages/home/home.component';
import {CategoryComponent} from './Pages/category/category.component';
import {CartComponent} from './Pages/cart/cart.component';
import {PaymentComponent} from './Pages/payment/payment.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'home/:id/:tableid', component: HomeComponent},
  {path: 'category/:id', component: CategoryComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'payment/:data', component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
