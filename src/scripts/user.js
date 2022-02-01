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

export { getNotifications, getUserDetails, updateUserDetails };
