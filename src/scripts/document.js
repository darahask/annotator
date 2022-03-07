import axios from "axios";
import { server, socketPath } from "../constants/constant";

async function getDocument(token, id) {
    let response = await axios.get(server + `user-document-list/${id}`, {
        headers: {
            authtoken: token
        },
    }).catch(function(error) {
        console.log(error)
        return false;
    });

    return response
}

async function getAnnotations(token, id) {
    let response = await axios.get(server + 'document-annotation-list',  {
        headers: {
            authtoken: token
        },
    }).catch(function(error) {
        console.log(error)
        return false;
    });

    return response
}

async function socketConnect(id) {
    const socket = new WebSocket(socketPath + id.toString() + '/');
    return socket
}

async function trainModel(token, model_name, id) {
    let response = await axios.post(server + "train-model", {'id': id, 'model_name': model_name}, {
        headers: {
            authtoken: token
        },
    }).catch(function(e) {
        console.log(e)
        return false;
    });

    return response
}

export { getDocument, socketConnect, trainModel }