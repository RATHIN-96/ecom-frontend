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
import { adminGuard } from './guards/admin.guard';

import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CategoryManagementComponent } from './components/admin/category-management/category-management.component';
import { ProductManagementComponent } from './components/admin/product-management/product-management.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { OrderManagementComponent } from './components/admin/order-management/order-management.component';

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

    // ------------------------
    // ADMIN
   // ------------------------

  {path: 'admin',

    component: AdminLayoutComponent,

    canActivate: [adminGuard],

    children: [

     {path: '',component: AdminDashboardComponent},

    {path: 'categories',component: CategoryManagementComponent},

    {path: 'products',component: ProductManagementComponent},

    {path: 'users',component: UserManagementComponent},

    {path: 'orders',component: OrderManagementComponent}]
  },

  { path: '**', redirectTo: '' },

];