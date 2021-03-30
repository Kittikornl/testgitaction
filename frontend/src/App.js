import "./App.scss";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import ResetPassword from "./login/resetpassword";
import { useHistory } from "react-router-dom";
import Profile from "./profile/profile";
import Editprofile from "./profile/Editprofile";
import PrivateRoute from "./components/privateroute";
import Notification from "./components/notification";
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
        <PrivateRoute exact key="history" path="/history" component={History} />
        <PrivateRoute
          exact
          key="history-desc"
          path="/history/description"
          component={HistoryDesc}
        />
        <PrivateRoute
          exact
          key="checkout"
          path="/checkout"
          component={Checkout}
        />
        <Route exact key="review" path="/review" component={Review} />
        <Route exact key="cart" path="/cart" component={Cart} />
        <Route exact key="shipment" path="/shipment" component={Shipment} />
      </Switch>
    </Router>
  );
}

export default App;
