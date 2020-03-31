import Vue from 'vue';
import Router from 'vue-router';

//service
import TokenService from '../services/tokenService';

// components
import HomePageCollection from '../components/pages/HomePage/HomePageCollection';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import ProductPage from '../components/pages/ProductPage/ProductPage';
import ShoppingCartPage from '../components/pages/ShoppingCartPage/ShoppingCartPage';
import AddressesPageCollection from '../components/pages/AddressPage/AddressesPageCollection';
import OrdersPageCollection from '../components/pages/OrdersPage/OrdersPageCollection';

//admin part
import AdminUsersCollectionPage from '../components/pages/AdminUsersPage/AdminUsersCollectionPage';
import AdminProductsCollectionPage from '../components/pages/AdminProductsPage/AdminProductsCollectionPage';
import AdminAddProductPage from '../components/pages/AdminAddProductPage/AdminAddProductPage';

//
import NotFoundPage from '../components/shared/notFoundPage/NotFoundPage';

//just test thing
import Invoice from '../components/shared/purchase/StripePayment';

Vue.use(Router)

const tokenService = new TokenService();

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePageCollection
    },
    {
      path: '/product/:id',
      name: 'ProductPage',
      component: ProductPage
    },
    {
      path: '/shoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCartPage
    },
    {
      path: '/myAddresses',
      name: 'MyAddresses',
      component: AddressesPageCollection
    },
    {
      path: '/orders',
      name: 'OrdersPage',
      component: OrdersPageCollection
    },
    {
      path: '/test',
      name: 'Invoice',
      component: Invoice
    },
    {
      path: '/editUsers',
      name: 'UsersCollection',
      component: AdminUsersCollectionPage,
      beforeEnter: (to, from, next) => {
        next(tokenService.isAdmin())
      }
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: AdminAddProductPage,
      beforeEnter: (to, from, next) => {
        next(tokenService.isAdmin())
      }
    },
    {
      path: '/editProducts',
      name: 'ProductsCollection',
      component: AdminProductsCollectionPage,
      beforeEnter: (to, from, next) => {
        next(tokenService.isAdmin())
      }
    },
    {
      path: '*',
      component: NotFoundPage
    }
  ]
})
