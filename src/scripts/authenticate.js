import axios from 'axios'
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/authAction'
import { server } from '../constants/constant'

async function doLogin(userDetails, rememberme) {
    let response = await axios.post(server + 'login', userDetails).catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            return {
                type: LOGIN_FAIL,
                payload: {
                    message: error.response.data.detail
                }
            }
        }
    })

    console.log(response)

    if (response.status === 200) {
        return {
            type: LOGIN_SUCCESS,
            payload: {
                token: response.data.jwt,
                isAuthentcated: true,
                rememberme: rememberme
            }
        }
    } else {
        return response
    }

}

async function doRegister(userDetails) {
    console.log(userDetails)
    let response = await axios.post(server + 'register', userDetails).catch(function(error) {
        if (error.response) {
            console.log(error.response.data);
            return {
                type: REGISTER_FAIL,
                payload: {
                    message: error.response.data.detail
                }
            }
        }
    })

    console.log('register response', response)

    if (response.status === 200) {
        return {
            type: REGISTER_SUCCESS,
            payload: {
                token: response.data.jwt,
                isAuthentcated: true
            }
        }
    } else {
        return response
    }
}

async function validateToken(token) {
    let response = await axios.post(server + 'validate-token', {}, {
        headers: {
            authtoken: token,
        },
    })
    if(response.status === 200)
        return true
    else
        return false
}

export { doLogin, doRegister, validateToken }
