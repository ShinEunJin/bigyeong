import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import GlobalStyle from "../Components/GlobalStyle"
import Header from "./Header"
import Auth from "../hoc/auth"
import Home from "../Routes/Home";
import Login from "../Routes/Login"
import Register from "../Routes/Register"
import Record from "../Routes/Record";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Auth(Home, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/record" component={Auth(Record, true)} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
