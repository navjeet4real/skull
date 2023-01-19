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
                ...state,
                user: action.payload.user,
            }
        default:
            return state
    }
}

export default authReducer