import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./auth/auth";
import Profile from "./profile/profile";

//TODO: connect with store to get auth info

const App = (props) => {
  let navSwitch = (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Akshara
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path="/profile"><Profile/></Route>
          <Route path="/login" ><Login/></Route>
          <Route path="/" ><div>HELLO</div></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );

  return navSwitch;
};

export default App;
