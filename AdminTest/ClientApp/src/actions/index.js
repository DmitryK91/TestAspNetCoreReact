import * as types from './types';
import axios from 'axios';


export const changeVisibleCount = (val) => ({
    type: types.CHANGE_ITEMS_COUNT,
    payload: val < 10 ? 10 : val
});

export const GET = (page, visibleCount, sort, filters) => async dispatch => {
    dispatch({
        type: types.GET_STUDENTS_PENDING
    });

    const orderBy = sort ? Object.keys(sort)[0] : null;
    const data = {
        visibleCount,
        orderBy,
        sortDirection: sort ? sort[orderBy] : null,
        filters
    }

    await axios.post(`/api/students/${page}`,
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            dispatch({
                type: types.GET_STUDENTS_SUCCESS,
                payload: response.data
            })
        )
        .catch(error =>
            dispatch({
                type: types.GET_STUDENTS_FAILED,
                payload: error
            })
        );
}

export const ADD = (student) => async dispatch => {
    dispatch({
        type: types.ADD_STUDENT_PENDING
    });

    await axios.post(`/api/students`,
        JSON.stringify(student),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response =>
            dispatch({
                type: types.ADD_STUDENT_SUCCESS,
                payload: response.data
            })
        )
        .catch(error =>
            dispatch({
                type: types.ADD_STUDENT_FAILED,
                payload: error
            })
        );
}

export const EDIT = (student) => async dispatch => {
    dispatch({
        type: types.EDIT_STUDENT_PENDING
    });

    await axios.put(`/api/students`,
        JSON.stringify(student),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {

            if (!response.data) throw new Error(`Не удалось отредактировать ${student.id}`);

            dispatch({
                type: types.EDIT_STUDENT_SUCCESS,
                payload: student
            })
        })
        .catch(error =>
            dispatch({
                type: types.EDIT_STUDENT_FAILED,
                payload: error
            })
        );
}

export const DELETE = (studentID) => async dispatch => {
    dispatch({
        type: types.DELETE_STUDENT_PENDING
    });

    await axios.delete(`/api/students/${studentID}`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {

            if (!response.data) throw new Error(`Не удалось удалить ${studentID}`);

            dispatch({
                type: types.DELETE_STUDENT_SUCCESS,
                payload: studentID
            })
        })
        .catch(error =>
            dispatch({
                type: types.DELETE_STUDENT_FAILED,
                payload: error
            })
        );
}