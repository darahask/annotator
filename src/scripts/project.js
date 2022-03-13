import axios from 'axios'
import { server } from '../constants/constant'

async function doCreateProject(projectDetails,authToken) {
    let response = await axios.post(server + 'create-project',projectDetails, {
        headers: {
            authtoken: authToken
        },
    })
    .catch(function(error) {
        return {
            status:404,
            data:{
                "message":"something went wrong while creating project"
            }
        }
    })
    console.log("response from create-project route");
    console.log(response);

    return response.data;

}

async function doGetListOfProjectsOfaParticularUser(authToken) {
    console.log(authToken)
    let response = await axios.get(server + 'get-project-list',{
        headers: {
            authtoken: authToken
        },
    })
    .catch(function(error) {
        console.log(error);
        return {
            data:{
                "project-list": []
            }
        }
    })
    console.log("response from get-project-list route");
    console.log(response);

    return response;

}

async function fetchAllDocumentsOfAProject(projectId,authToken) {
    console.log(authToken)
    let response = await axios.post(server + 'document-list',projectId,{
        headers: {
            authtoken: authToken
        },
    })
    .catch(function(error) {
        console.log(error);
        return {
            data:{
                "project-list": []
            }
        }
    })
    console.log("response from get-project-list route");
    console.log(response);

    return response;

}

export { doCreateProject , doGetListOfProjectsOfaParticularUser, fetchAllDocumentsOfAProject};