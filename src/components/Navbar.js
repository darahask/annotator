import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { authAction, LOGOUT } from "../actions/authAction";
import Navnotification from "./Navnotification";

const Navbar = (props) => {
    let { auth, dispatch } = props;
    let history = useHistory();

    useEffect(() => { }, [auth]);

    let handleLogout = (e) => {
        e.preventDefault();
        dispatch(authAction(LOGOUT, {}));
        history.push('/');
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
                        {!auth.isAuthenticated ? (
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        ) : (
                            <>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/documents" className="nav-link">
                                            Documents
                                        </Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <Navnotification />
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link">
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/logout"
                                            className="nav-link"
                                            onClick={(e) => handleLogout(e)}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        )}
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
