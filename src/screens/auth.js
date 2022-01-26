import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authAction, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/authAction";
import { doLogin, doRegister } from "../scripts/auth/authenticate";

const Login = (props) => {
    let [ui_state, set_ui_state] = useState({ checked: "login" });
    let [message, set_message] = useState("");
    let { auth, dispatch } = props;
    let history = useHistory()

    let [userDetails, setUserDetails] = useState({
        'name': '',
        'username': '',
        'password': '',
        'rememberme': false
    })

    let handleName = (e) => {
        setUserDetails({ ...userDetails, 'name': e.target.value });
    };

    let handleUserName = (e) => {
        setUserDetails({ ...userDetails, 'username': e.target.value });
    };

    let handlePassword = (e) => {
        setUserDetails({ ...userDetails, 'password': e.target.value });
    };

    let handleRememberMe = (e) => {
        const { checked } = e.target
        console.log(checked)
        setUserDetails({ ...userDetails, 'rememberme': checked });
    };

    let handleRadio = (e, type) => {
        set_ui_state({
            ...ui_state,
            checked: type,
        });
        console.log();
    };

    let handleLogin = async (e) => {
        e.preventDefault();
        let res = await doLogin({ 'username': userDetails.username, 'password': userDetails.password }, userDetails.rememberme)
        console.log(res)
        dispatch(authAction(res.type, res.payload))
        if (res.type === LOGIN_SUCCESS) {
            history.push('/')
        } else if (res.type === LOGIN_FAIL) {
            set_message("Incorrect username or password")
        }
    };

    let handleRegister = async (e) => {
        e.preventDefault();
        let res = await doRegister({ 'name': userDetails.name, 'username': userDetails.username, 'password': userDetails.password })
        console.log(res)
        dispatch(authAction(res.type, res.payload))
        if (res.type === REGISTER_SUCCESS) {
            history.push('/')
        } else if (res.type === REGISTER_FAIL) {
            set_message("username already taken")
        }
    };

    let Radiogroup = (
        <div>
            <input
                type="radio"
                className="btn-check m-2"
                name="options"
                id="toggle-login"
                autoComplete="off"
                onChange={(e) => handleRadio(e, "login")}
            ></input>
            <label className="btn btn-primary" htmlFor="toggle-login">
                Login
            </label>

            <input
                type="radio"
                className="btn-check m-2"
                name="options"
                id="toggle-signup"
                autoComplete="off"
                onChange={(e) => handleRadio(e, "register")}
            ></input>
            <label className="btn btn-primary" htmlFor="toggle-signup">
                Signup
            </label>
        </div>   
    );

    let Formlogin = (
        <form onSubmit={(e) => handleLogin(e)}>
            <div className="mb-3">
                <label htmlFor="login-username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="login-username"
                    onChange={(e) => handleUserName(e)}
                    value={userDetails.username}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    onChange={(e) => handlePassword(e)}
                    value={userDetails.password}
                    ></input>
            </div>
            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="login-remember"
                    onChange={(e) => handleRememberMe(e)}
                    defaultChecked={userDetails.rememberme}
                    ></input>
                <label className="form-check-label" htmlFor="login-remember">
                    Remember me
                </label>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const Formsignup = (
        <form onSubmit={(e) => handleRegister(e)}>
            <div className="mb-3">
                <label htmlFor="regester-name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="regester-name"
                    onChange={(e) => handleName(e)}
                    value={userDetails.name}
                ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="register-username" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    onChange={(e) => handleUserName(e)}
                    value={userDetails.username}
                    ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="resgister-pass" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="resgister-pass"
                    defaultChecked={userDetails.password}
                    onChange={(e) => handlePassword(e)}
                    ></input>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        <div className="container">
            {Radiogroup}

            { message !== "" ? <div className="alert alert-danger" role="alert">
                { message }
            </div> : <div></div> }

            {ui_state.checked === "login" ? Formlogin : Formsignup}
        </div>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Login);
