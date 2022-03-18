import axios from "axios";
import { server, socketPath } from "../constants/constant";

async function getDocument(token, data) {
    let response = await axios.post(server + 'document-detail', data, {
        headers: {
            authtoken: token
        },
    }).catch(function(error) {
        console.log(error)
        return false;
    });

    return response
}

async function getAnnotations(token, data) {
    let response = await axios.post(server + 'annotation-list', data, {
        headers: {
            authtoken: token
        },
    }).catch(function(error) {
        console.log(error)
        return null;
    });
    return response.data
}

async function addAnnotations(token, data) {
    let response = await axios.post(server + 'annotation', data, {
        headers: {
            authtoken: token
        },
    }).catch(function(error) {
        console.log(error)
        return false;
    });

    return response
}

async function deleteAnnotation(token, data) {
    await axios.delete(server + 'annotation', {
        headers: {
            authtoken: token
        },
        data: data,
    }).catch(function(error) {
        console.log(error)
        return false;
    });
    return true
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

export { getDocument, deleteAnnotation, trainModel, getAnnotations, addAnnotations }