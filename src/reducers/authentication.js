import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    login: {
        status:  'INIT'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        accessToken: '',
    },
}

export default function authentication(state, action) {
    if(typeof state === "undefined") state = initialState;
    
    switch(action.type) {
        // LOGIN
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    accessToken: { $set: action.accessToken },
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.ACCESS_TOKEN_SAVE:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true},
                    accessToken: { $set: action.accessToken },
                }
            })
        default:
            return state;

    }
}