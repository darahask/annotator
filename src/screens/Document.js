import { connect } from "react-redux";

const Document = (props) => {
    return (
        <div>
        </div>
    )
}

export default connect((state) => ({ auth: state.auth }))(Document)
