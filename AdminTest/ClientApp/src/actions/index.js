import * as types from './types';
import axios from 'axios';


export const changeItemsCount = (val) => ({
    type: types.CHANGE_ITEMS_COUNT,
    payload: val < 10 ? 10 : val
});

export const getUsers = (page, itemsCount, sort, filters) => async dispatch => {
    dispatch({
        type: types.GET_USERS_PENDING
    });

    const orderBy = sort ? Object.keys(sort)[0] : null;
    const data = {
        itemsCount,
        orderBy,
        sortDirection: sort ? sort[orderBy] : null,
        filters
    }

    await axios.post(`/api/users/${page}`,
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            dispatch({
                type: types.GET_USERS_SUCCESS,
                payload: response.data
            })
        )
        .catch(error =>
            dispatch({
                type: types.GET_USERS_FAILED,
                payload: error
            })
        );
}