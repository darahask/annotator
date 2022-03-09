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

export { doCreateProject };