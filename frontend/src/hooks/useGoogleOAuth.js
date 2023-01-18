import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";



const getUserInfo = async (access_token) => {
    const headers = { Authorization: `Bearer ${access_token}` };
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';

    const res = await axios.get(url, {
        headers,
    })
    return res.data
}


export const useGoogleOAuth = ({ onSuccess, onError }) => {
    return useGoogleLogin({
        onSuccess: async credentials => {
            
            const { access_token } = credentials;
            const user = await getUserInfo(access_token);
            const payload = { ...user, access_token };
            const res = await axios.post('/api/google_login', payload)
            
            if (onSuccess !== undefined) {
                onSuccess(res)
            }
        },
        onError,
    })
}

export default useGoogleOAuth;