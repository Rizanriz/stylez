import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './view/view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:"", component:HomeComponent},

  {path:"register", component:RegisterComponent},

  {path:"login", component:LoginComponent},

  {path:":id/view", component:ViewComponent},

  {path:"wishlist", component:WishlistComponent},

  {path:"cart", component:CartComponent},

  {path:"checkout", component:CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
