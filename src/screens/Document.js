import { connect } from "react-redux";
import Managemodel from "../components/Managemodel";
import Annotationcanvas from "../components/Annotationcanvas";
import Annotationlist from "../components/Annotationlist";
import { useState } from "react";

const Document = (props) => {

    const [annotations, setAnnotations] = useState([])

    return (
        <div>
            <div className="row justify-content-around">
                <div className="col-md-8">
                    <Annotationcanvas data={{annotations,setAnnotations}} />
                </div>
                <div className="col-md-3">
                    <Annotationlist data={{annotations,setAnnotations}}/>
                </div>
            </div>
            <Managemodel />
        </div>
    );
};

export default connect((state) => ({ auth: state.auth }))(Document);
