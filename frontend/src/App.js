import './App.scss';
import { Route, Router, Switch } from 'react-router-dom';
import Login from "./login/login"
import Register from './register/register'
import ResetPassword from './login/resetpassword'
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory()
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
      <div className="flex">
        {/* {checkPath(location.pathname) ? } */}
        <Switch>
          <Route exact key="login" path="/login" component={Login} />
          <Route exact key="login" path="/" component={Login} />
          <Route exact key="register" path="/register" component={Register} />
          <Route exact key="reset password" path="/password/reset" component={ResetPassword} />
          {/* <Route exact key="profile" path="profile" component={profile} /> 
          <Route exact key="edit profile" path="profile/edit" component={editProfile} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
