import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import GlobalStyle from "../Components/GlobalStyle"
import Header from "./Header"
import Home from "../Routes/Home";
import Login from "../Routes/Login"
import Register from "../Routes/Register"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
