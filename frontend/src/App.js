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
import Header from "./components/static/banner";
import EditShop from "./shop/editShop";
import Homepage from "./home/home";

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
        <PrivateRoute exact key="home" path="/home" component={Homepage} />
        <PrivateRoute exact key="profile" path="/profile" component={Profile} />
        <PrivateRoute
          exact
          key="edit shop"
          path="/edit/shop"
          component={EditShop}
        />
      </Switch>
    </Router>
  );
}

export default App;
