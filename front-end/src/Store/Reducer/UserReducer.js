import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from "../Actions/UserActions";

const initialState = {
    user: null,
    loginError: null,
    accessToken: ''
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, accessToken: action.accessToken, loginError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, user: null};

        default:
            return state;
    }
};

export default usersReducer;