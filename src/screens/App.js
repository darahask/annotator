import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "./auth";
import Profile from "./profile";

//TODO: connect with store to get auth info

const App = (props) => {

    return (
        <BrowserRouter>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/profile"><Profile /></Route>
                    <Route path="/login" ><Login /></Route>
                    <Route path="/" ><h1 style={{textAlign:"center"}}>Under construction!</h1></Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
