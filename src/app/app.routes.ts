import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { ProductList } from './components/product-list/product-list';
import { ProductDetail } from './components/product-detail/product-detail';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';
import { AdminProducts } from './components/admin-products/admin-products';
import { AdminCategories } from './components/admin-categories/admin-categories';
import { AdminOrders } from './components/admin-orders/admin-orders';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { adminGuard } from './guards/admin-guard';
import { MyOrders } from './components/my-orders/my-orders';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'my-orders', component: MyOrders },

  {
    path: 'admin/products',
    component: AdminProducts,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    component: AdminCategories,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrders,
    canActivate: [adminGuard],
  },
  { 
    path: 'admin/dashboard',
    component: AdminDashboard,
    canActivate: [adminGuard] 
  },

  { path: '**', redirectTo: '' },
];
