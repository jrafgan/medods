import axios from '../../axios-api';
import {push} from 'connected-react-router';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

const loginUserSuccess = (user, accessToken) => ({type: LOGIN_USER_SUCCESS, user, accessToken});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
    return (dispatch, getState) => {
        const user = getState().users.user;
        console.log(user);

        return axios.delete('/logout/' + user._id).then(
            response => {
                console.log('response data from api', response.data)
                dispatch({type: LOGOUT_USER});
                dispatch(push('/'));
            },
            error => {
                if (error.response) {
                    dispatch(loginUserFailure(error.response.data))
                } else {
                    dispatch(loginUserFailure({global: 'No connection'}))
                }
            }
        )
    }
};

export const userSession = () => {
    return (dispatch, getState) => {

        const userData = getState().users

        return axios.post('/session', userData).then(
            response => {
                const newData = response.data;
                const user = newData.user;
                const accessToken = newData.accessToken;

                dispatch(loginUserSuccess(user, accessToken));
            },
            error => {
                if (error.response) {
                    dispatch(push('/'));
                    dispatch(loginUserFailure(error.response.data));
                } else {
                    dispatch(loginUserFailure({global: 'No connection'}))
                }
            }
        )
    };
};

export const loginUser = userData => {
    return dispatch => {
        return axios.post('/login', userData).then(
            response => {
                const data = response.data;

                dispatch(loginUserSuccess(data.user, data.accessToken));
                dispatch(push('/office'));
            },
            error => {
                if (error.response) {
                    dispatch(loginUserFailure(error.response.data.error));

                } else {
                    dispatch(loginUserFailure('No connection'))
                }
            }
        );
    };
};