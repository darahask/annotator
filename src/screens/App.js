import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { authAction, LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/authAction";
import Navbar from "../components/Navbar";
import { validateToken } from "../scripts/authenticate";
import Login from "./auth";
import Document from "./Document";
import Profile from "./profile";
import SearchBar from '../components/Searchbar'

//TODO: connect with store to get auth info

const App = (props) => {
    useEffect(() => {
        async function load() {
            let token = !props.auth.token ? localStorage.getItem("token") : props.auth.token;
            if(token){
                let status = await validateToken(token);
                if (status === true) {
                    props.dispatch(
                        authAction(LOGIN_SUCCESS, {
                            token: token,
                            isAuthenticated: true,
                            rememberme: true,
                            message: null,
                        })
                    );
                } else {
                    authAction(LOGIN_FAIL, {
                        message: "Token Expired",
                    });
                }
            }
        }

        load();
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/document">
                        <Document/>
                    </Route>
                    <Route path="/">
                        <h1 style={{ textAlign: "center", marginTop: "10px" }}>
                            Under construction!
                            
                        </h1>
                        <div>
                            <SearchBar />
                        </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default connect((state) => ({ auth: state.auth }))(App);
