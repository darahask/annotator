import { useState } from "react";

const Login = (props) => {
  let [ui_state, set_ui_state] = useState({ checked: "login" });

  let name = "";
  let username = "";
  let password = "";
  let rememberme = true;

  let handleName = (e) => {
    name = e.currentTarget.value;
  };

  let handleUserName = (e) => {
    username = e.currentTarget.value;
  };

  let handlePassword = (e) => {
    password = e.currentTarget.value;
  };

  let handleRememberMe = (e) => {
    rememberme = e.currentTarget.value;
  };

  let handleRadio = (e, type) => {
    set_ui_state({
      ...ui_state,
      checked: type,
    });
    console.log();
  };

  let handleLogin = (e) => {
    e.preventDefault();
  };

  let handleRegister = (e) => {
    e.preventDefault();
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
          aria-describedby="emailHelp"
          onChange={(e) => handleUserName(e)}
        ></input>
        <div id="emailHelp" className="form-text">
          We'll never share your username with anyone else.
        </div>
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
        ></input>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="login-remember"
          onChange={(e) => handleRememberMe(e)}
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
          aria-describedby="nameHelp"
          onChange={(e) => handleName(e)}
        ></input>
        <div id="nameHelp" className="form-text">
          We'll never share your name with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="register-username" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          id="register-username"
          aria-describedby="usernameHelp"
          onChange={(e) => handleUserName(e)}
        ></input>
        <div id="usernameHelp" className="form-text">
          We'll never share your username with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="resgister-pass" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="resgister-pass"
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
      {ui_state.checked === "login" ? Formlogin : Formsignup}
    </div>
  );
};

export default Login;
