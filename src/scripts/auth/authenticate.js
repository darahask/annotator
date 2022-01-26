import {LOGIN_SUCCESS} from '../../actions/authAction'

async function doLogin(){
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token: null,
            isAuthentcated: null
        }
    }
}

async function doRegister(){

}

export {doLogin, doRegister}