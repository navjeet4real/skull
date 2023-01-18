import GlobalTypes from "./GlobalTypes";
import axios from 'axios'

export const dispatchLogin = (authResponse) => {
    return {
        type: GlobalTypes.AUTH,
        payload: {
            data: authResponse
        }
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: GlobalTypes.GET_USER,
        payload: {
            user: res.data,
        }
    }
}