import axios from 'axios'
import { server } from '../constants/constant'

async function fetchAllAnnotationsOfAParticularProject(projectDetails,authToken) {
    let response = await axios.post(server + 'all-annotations',projectDetails, {
        headers: {
            authtoken: authToken
        },
    })
    .catch(function(error) {
        return {
            status:404,
            data:{
                "annotations": []
            }
        }
    })
    console.log("response from all-annotations route");
    console.log(response);

    return response;

}

export { fetchAllAnnotationsOfAParticularProject };