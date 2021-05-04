<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
import "./App.scss";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import ResetPassword from "./login/resetpassword";
import { useHistory } from "react-router-dom";
import Profile from "./profile/profile";
import Editprofile from "./profile/Editprofile";
import PrivateRoute from "./components/privateroute";
import Home from "./home/home";
import Shop from "./shop/shop";
import ManageProduct from "./product/manageProduct";
import Product from "./product/product";
import ManageShop from "./shop/manageShop";
import EditShop from "./shop/editShop";
import CreateShop from "./shop/createShop";
import History from "./history/history";
import HistoryDesc from "./history/historyDesc";
import Review from "./review/review";
import Shipment from "./shipment/shipment";
import Cart from "./cart/cart";
import Checkout from "./checkout/checkout";
import ShopOrder from "./shop/shopOrder";

function App() {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          exact
          key="editprofile"
          path="/profile/edit"
          component={Editprofile}
        />
        <Route exact key="login" path="/login" component={Login} />
        <Route exact key="login" path="/" component={Login} />
        <Route exact key="register" path="/register" component={Register} />
        <Route
          exact
          key="reset password"
          path="/password/reset"
          component={ResetPassword}
        />
        <PrivateRoute exact key="home" path="/home" component={Home} />
        <PrivateRoute exact key="shop" path="/shop/:id" component={Shop} />
        <PrivateRoute exact key="profile" path="/profile" component={Profile} />
        <PrivateRoute
          exact
          key="edit shop"
          path="/edit/shop"
          component={EditShop}
        />
        <PrivateRoute
          exact
          key="create shop"
          path="/create/shop"
          component={CreateShop}
        />
        <PrivateRoute
          exact
          key="manage-product"
          path="/manage/product"
          component={ManageProduct}
        />
        <PrivateRoute
          exact
          key="product"
          path="/product/:id"
          component={Product}
        />
        <PrivateRoute
          exact
          key="manage-shop"
          path="/manage/shop"
          component={ManageShop}
        />
        <PrivateRoute exact key="order" path="/order" component={History} />
        <PrivateRoute
          exact
          key="order-desc"
          path="/order/description"
          component={HistoryDesc}
        />
        <PrivateRoute
          exact
          key="checkout"
          path="/checkout"
          component={Checkout}
        />
        <PrivateRoute exact key="review" path="/review" component={Review} />
        <PrivateRoute exact key="cart" path="/cart" component={Cart} />
        <PrivateRoute exact key="shipment" path="/shipment" component={Shipment} />
        <PrivateRoute exact key="shop-order" path="/orders/shop" component={ShopOrder} />
      </Switch>
    </Router>
<<<<<<< HEAD
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> 982c88e3d1f62db5c3e8b1d487fcbf8f79335ddd
=======
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
  );
}

export default App;
