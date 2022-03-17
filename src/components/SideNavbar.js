import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { authAction, LOGOUT } from "../actions/authAction";
import Navnotification from "./Navnotification";
// import "../styles/sideNavBar.css";


const SideNavbar = (props) => {
    let { auth, dispatch } = props;
    let history = useHistory();

    useEffect(() => { }, [auth]);

    let handleLogout = (e) => {
        e.preventDefault();
        dispatch(authAction(LOGOUT, {}));
        history.push('/');
    };

    let sideNavbar = (
        <div>
            <div className="offcanvas offcanvas-start w-25" tabIndex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div className="offcanvas-header">
                <h1 className="offcanvas-title d-none d-sm-block" id="offcanvas">
                    <Link to='/'>
                        Akshara
                    </Link>
                </h1>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-0">
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link text-truncate">
                            <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                        </a>
                        <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                            <li><a className="dropdown-item" href="#">New project...</a></li>
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            {/* <li>
                                <hr className="dropdown-divider">
                            </li> */}
                            <li><a className="dropdown-item" href="#">Sign out</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Products</span></a>
                    </li>
                    <li>
                        <a href="#" className="nav-link text-truncate">
                            <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                    </li>
                </ul>
            </div>
        </div>
        
        </div>
    )

    return sideNavbar;
};

let mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SideNavbar);
