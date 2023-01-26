import ACTIONS from '../action/GlobalTypes'

const initialState = {
    user: {},
    isLogged: false,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                isLogged: true,
                user : action.payload.data.user
            }
        case ACTIONS.GET_USER:
            return {
                
                user: action.payload.data.user,
            }
        default:
            return state
    }
}

export default authReducer