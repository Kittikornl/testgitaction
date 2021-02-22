import "./App.scss";
import { Route, Router, Switch } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import ResetPassword from "./login/resetpassword";
import { useHistory } from "react-router-dom";
import Profile from "./profile/profile";
import Editprofile from "./profile/Editprofile";

function App() {
  const history = useHistory();
  // const location = useLocation();
  // const auth = useContext(Authentication);
  // const { currentUser } = auth;
  // const [user, setUser] = useState("");

  // const checkPath = (path) => {
  //   if (path === "/login") {
  //     return false;
  //   }
  //   return true;
  // };
  return (
    <Router history={history}>
      <Switch>
        <Route
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
        <Route exact key="profile" path="/profile" component={Profile} />
        {/* <Route exact key="edit profile" path="profile/edit" component={editProfile} /> */}
      </Switch>
    </Router>
  );
}

export default App;
