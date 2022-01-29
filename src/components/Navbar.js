import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authAction, LOGOUT } from "../actions/authAction";
import Navnotification from "./Navnotification";

const Navbar = (props) => {
    let { auth, dispatch } = props;

    useEffect(() => {}, [auth]);

    let handleLogout = (e) => {
        e.preventDefault();
        dispatch(authAction(LOGOUT, {}));
    };

    let navbar = (
        <nav className="navbar-expand-lg navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>
                    Akshara
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!auth.isAuthenticated ? (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ms-auto">
                                 <li className="nav-item">
                                    <Navnotification/>
                                </li>
                                <li className="nav-item">
                                    <Link to="/document" className="nav-link">
                                        Documents
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Navnotification/>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/logout"
                                        className="nav-link"
                                        onClick={(e) => handleLogout(e)}
                                    >
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );

    return navbar;
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
