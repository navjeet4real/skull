import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { GoogleLoginUser } from '../redux/slices/auth';


const getUserInfo = async (access_token) => {
    const headers = { Authorization: `Bearer ${access_token}` };
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const res = await axios.get(url, {
        headers,
    })
    return res.data
}


export const useGoogleOAuth = ({ onSuccess, onError }) => {
    const dispatch = useDispatch()
    return useGoogleLogin({
        onSuccess: async credentials => {
            console.log(credentials, "credentials")
            const { access_token } = credentials;
            const user = await getUserInfo(access_token);
            const payload = { ...user, access_token };
            // const res = await axios.post('/api/google_login', payload)
            
            if (onSuccess !== undefined) {
                onSuccess(payload)
                dispatch(GoogleLoginUser(payload))
            }
        },
        onError,
    })
}

export default useGoogleOAuth;