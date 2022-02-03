import axios from "axios";
import { server } from "../constants/constant";

async function getNotifications(token) {
    let response = await axios.get(server + "get-notifications", {
        headers: {
            authtoken: token,
        },
    });

    if (response.status === 200) {
        let notifications = response.data["notifications"];
        return notifications;
    } else return false;
}

async function getUserDetails(token) {
    let response = await axios.get(server + "get-user", {
        headers: {
            authtoken: token,
        },
    });

    if (response.status === 200) {
        return response.data;
    } else return false;
}

async function updateUserDetails(token, userDetails) {
    let response = await axios.put(server + "get-user", userDetails, {
        headers: {
            authtoken: token
        },
    }).catch(function() {
        return false;
    });

    if (response.status === 200) {
        return true;
    } else return false;
}

async function getRequests(token, type) {
    let response = await axios.get(server + "get-" + type, {
        headers: {
            authtoken: token
        }
    }).catch(function () {
        return null
    });
    if(response.status === 200)
        return response.data[type]
    else
        return null
}

async function getUsersList(token) {
    let response = await axios.get(server + "get-user-list", {
        headers: {
            authtoken: token
        }
    }).catch(function () {
        return null
    });
    if(response.status === 200)
        return response.data['user-list']
    else
        return null
}

async function sendRequest(token, newRequest) {
    let response = await axios.post(server + "request-list", newRequest, {
        headers: {
            authtoken: token
        },
    }).catch(function() {
        return false;
    });

    if (response.status === 200) {
        return true;
    } else return false;
}

async function sendRequestAction(token, id, req_status) {
    let response = await axios.put(server + "request-list/" + id.toString(), req_status, {
        headers: {
            authtoken: token
        },
    }).catch(function() {
        return false;
    });

    if (response.status === 200) {
        return true;
    } else return false;
}

async function deleteAnnotator(token, id) { 
    let response = await axios.delete(server + "delete-annotator/" + id.toString(), {
        headers: {
            authtoken: token
        },
    }).catch(function() {
        return false;
    });

    if (response.status === 200) {
        return true;
    } else return false;
}

async function deleteProject(token, id) { 
    let response = await axios.delete(server + "delete-project/" + id.toString(), {
        headers: {
            authtoken: token
        },
    }).catch(function() {
        return false;
    });

    if (response.status === 200) {
        return true;
    } else return false;
}

export { getNotifications, getUserDetails, updateUserDetails, getRequests, getUsersList, sendRequest, sendRequestAction, deleteAnnotator, deleteProject };
