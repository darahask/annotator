import axios from "axios";
import { server, socketPath } from "../constants/constant";

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

export { socketConnect, trainModel }