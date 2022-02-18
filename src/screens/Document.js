import { connect } from "react-redux";
import Managemodel from "../components/Managemodel";
import Annotationcanvas from "../components/Annotationcanvas";

const Document = (props) => {
    return (
        <div>
            <div className="row justify-content-center" style={{ height: "800px" }}>
                <div className="col-md-8">
                    <Annotationcanvas />
                </div>
                <div className="col-md-3"></div>
            </div>
            <Managemodel />
        </div>
    );
};

export default connect((state) => ({ auth: state.auth }))(Document);
