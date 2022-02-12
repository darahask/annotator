import { connect } from "react-redux";
import Managemodel from "../components/Managemodel";

const Document = (props) => {
    return (
        <div>
            <Managemodel />
        </div>
    )
}

export default connect((state) => ({ auth: state.auth }))(Document)
