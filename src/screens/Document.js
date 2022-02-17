import { connect } from "react-redux";
import Managemodel from "../components/Managemodel";
import Annotationcanvas from "../components/Annotationcanvas";

const Document = (props) => {
    return (
        <div>
            <Annotationcanvas/>
            <Managemodel />
        </div>
    )
}

export default connect((state) => ({ auth: state.auth }))(Document)
