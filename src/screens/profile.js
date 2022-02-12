import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfileRequests from "../components/Profilerequests";
import ProfileUserList from "../components/Profileuserslist";
import UserInfo from "../components/Userinfo";
import { deleteAnnotator, deleteProject, getUserDetails, updateUserDetails } from "../scripts/user";
import "./../styles/profile.css";

const Profile = (props) => {
    let history = useHistory();

    if (!props.auth.token) {
        history.push("/login");
    }

    const [annotatorList, setAnnotatorList] = useState([]);

    const [projectList, setProjectList] = useState([]);

    const [userInfo, setUserInfo] = useState({
        name: "",
        description: "",
        username: "",
        image: "",
    });

    useEffect(() => {
        async function load() {
            let userDetails = await getUserDetails(props.auth.token);
            setAnnotatorList(userDetails["annotator_list"]);
            setProjectList(userDetails["project_list"]);
            setUserInfo({
                name: userDetails["name"],
                description: userDetails["description"],
                username: userDetails["username"],
                image: "data:image/png;base64, " + userDetails["image"],
            });
        }
        load();
    }, []);

    const [errorMessage, setErrorMessage] = useState("");

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
        document.getElementById("error-modal-open").click();
    };

    const handleProfilePhotoChange = async () => {
        const file = document.querySelector("#updated-profile-photo").files[0];
        let image;
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                image = reader.result;
                document.getElementById("profile-photo").setAttribute("src", reader.result);
            };
        }
        document.getElementById("profile-photo-update-model-close").click();

        var formData = new FormData();
        formData.append("image", file);
        let status = await updateUserDetails(props.auth.token, formData);

        if (!status) {
            handleErrorMessage("Profile Photo not set, Try again");
            return "";
        }

        return image;
    };

    const handleAnnotatorDelete = async (id) => {
        let status = await deleteAnnotator(props.auth.token, id);

        if (status) {
            setAnnotatorList(annotatorList.filter((annotator) => annotator.id !== id));
        } else {
            handleErrorMessage("Cannot delete Annotator, Try again");
        }
    };

    const handleProjectDelete = async (id) => {
        let status = await deleteProject(props.auth.token, id);

        if (status) {
            setProjectList(projectList.filter((project) => project.id !== id));
        } else {
            handleErrorMessage("Cannot delete Project, Try again");
        }
    };

    return (
        <div>
            <div className="modal fade" id="error-modal" tabIndex="-1" aria-labelledby="error-model-label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header alert-danger" style={{ border: "1px solid #FF5252" }}>
                            <button id="error-modal-open" data-bs-toggle="modal" data-bs-target="#error-modal" style={{ visibility: "hidden" }}></button>
                            <h6 className="modal-title">{errorMessage}</h6>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
            <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} handleProfilePhotoChange={handleProfilePhotoChange} handleErrorMessage={handleErrorMessage} />
            <div className="list-main-container">
                <div className="container">
                    <div className="row justify-content-evenly">
                        <ProfileUserList title="Annotators" list={annotatorList} handleDelete={handleAnnotatorDelete} />
                        <ProfileUserList title="Projects" list={projectList} handleDelete={handleProjectDelete} />
                    </div>
                </div>
            </div>
            <ProfileRequests handleErrorMessage={handleErrorMessage} />
        </div>
    );
};

export default connect((state) => ({ auth: state.auth }))(Profile);
