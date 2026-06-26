import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'products', component: ProductListComponent },

  { path: 'products/:id', component: ProductDetailComponent },

  { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  { path: 'wishlist', component: WishlistComponent },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent },

  { path: 'orders', component: OrdersComponent ,canActivate: [authGuard]},

  {path: 'checkout',component: CheckoutComponent, canActivate: [authGuard]},

  { path: '**', redirectTo: '' }

];