import * as types from './types';


const initState = {
    users: [],
    pagesCount: 0,
    itemsCount: 10,
    error: null
};

export const requestUsers = (state = initState, action = {}) => {
    switch (action.type) {

        case types.GET_USERS_PENDING:
            return {
                ...state,
                isPending: true,
                users: []
            }

        case types.GET_USERS_SUCCESS:
            return {
                ...state,
                isPending: false,
                users: action.payload.data,
                pagesCount: action.payload.pagesCount
            }

        case types.GET_USERS_FAILED:
            return {
                ...state,
                isPending: false,
                error: action.payload
            }

        case types.CHANGE_ITEMS_COUNT:
            return {
                ...state,
                itemsCount: action.payload
            }

        default:
            return state;
    }
};
