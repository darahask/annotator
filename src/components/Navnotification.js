import Popup from "reactjs-popup";
import "../styles/navnotification.css";

let Navnotification = (props) => {
    let list = ["Hello", "hi"];

    return (
        <Popup
            trigger={
                <button className="notbutton">
                    <i className="fas fa-bell bellstyle mt-2 pt-1"></i>
                </button>
            }
            position="bottom center"
        >
            <div>
                {list.map((value,i) => (
                    <div
                            className="card border-dark mb-1"
                        style={{maxWidth:"18rem"}}
                        key={i}
                    >
                        <div className="card-body text-dark">
                            <h5 className="card-title">{value}</h5>
                            <p className="card-text">
                                Displaying requests
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Popup>
    );
};

export default Navnotification;
