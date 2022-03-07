import { connect } from "react-redux";
import Managemodel from "../components/Managemodel";
import Annotationcanvas from "../components/Annotationcanvas";
<<<<<<< HEAD
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getDocument } from "../scripts/document";

const Document = (props) => {
    let history = useHistory();
    let location = useLocation();
    const { id } = useParams();
    const [document, setDocument] = useState({});

    if (!props.auth.token) {
        history.push("/login");
    }

    useEffect(() => {
        async function load() {
            if (location.state) {
                setDocument(location.state);
            } else {
                let response = await getDocument(props.auth.token, id);
                if(response) {
                    setDocument(response.data)
                } else {
                    console.log("Document not found");
                    // Display Error page
                }
            }
        }
        load()
    },[]);
=======
import Annotationlist from "../components/Annotationlist";
import { useState } from "react";

const Document = (props) => {

    const [annotations, setAnnotations] = useState([])
>>>>>>> eb648bf8e82720bd51677c3d08aa06d1f692fa17

    return (
        <div>
            <div className="row justify-content-around">
                <div className="col-md-8">
<<<<<<< HEAD
                    <Annotationcanvas document={document} />
=======
                    <Annotationcanvas data={{annotations,setAnnotations}} />
                </div>
                <div className="col-md-3">
                    <Annotationlist data={{annotations,setAnnotations}}/>
>>>>>>> eb648bf8e82720bd51677c3d08aa06d1f692fa17
                </div>
            </div>
            <Managemodel />
        </div>
    );
};

export default connect((state) => ({ auth: state.auth }))(Document);
