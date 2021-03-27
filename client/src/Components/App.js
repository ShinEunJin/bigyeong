import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"
import GlobalStyle from "../Components/GlobalStyle"
import Header from "./Header"
import Auth from "../hoc/auth"
import Home from "../Routes/Home";
import Login from "../Routes/Login"
import Register from "../Routes/Register"
import Upload from "../Routes/Upload"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(Upload, true)} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
