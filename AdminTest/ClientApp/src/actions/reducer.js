import * as types from './types';


const initState = {
    students: [],
    pagesCount: 0,
    itemsCount: 0,
    visibleCount: 10,
    alert: {
        color: null,
        message: null
    }
};

export const requestStudents = (state = initState, action = {}) => {
    switch (action.type) {

        case types.GET_STUDENTS_PENDING:
            return {
                ...state,
                isPending: true,
                alert: initState.alert
            }

        case types.GET_STUDENTS_SUCCESS:
            return {
                ...state,
                isPending: false,
                students: action.payload.data,
                pagesCount: action.payload.pagesCount,
                itemsCount: action.payload.itemsCount
            }

        case types.GET_STUDENTS_FAILED:
            return {
                ...state,
                isPending: false,
                alert: {
                    color: 'danger',
                    message: 'ошибка!'
                }
            }

        case types.ADD_STUDENT_PENDING:
            return {
                ...state,
                alert: initState.alert
            }

        case types.ADD_STUDENT_SUCCESS:
            return {
                ...state,
                students: [...state.students, action.payload],
                itemsCount: state.itemsCount + 1,
                alert: {
                    color: 'success',
                    message: 'сохранен успешно!'
                }
            }

        case types.ADD_STUDENT_FAILED:
            return {
                ...state,
                alert: {
                    color: 'danger',
                    message: 'ошибка!'
                }
            }

        case types.EDIT_STUDENT_PENDING:
            return {
                ...state,
                alert: initState.alert
            }

        case types.EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                students: state.students.map(item => item.id === action.payload.id ? action.payload : item),
                alert: {
                    color: 'success',
                    message: 'сохранен успешно!'
                }
            }

        case types.EDIT_STUDENT_FAILED:
            return {
                ...state,
                alert: {
                    color: 'danger',
                    message: 'ошибка!'
                }
            }

        case types.DELETE_STUDENT_PENDING:
            return {
                ...state,
                alert: initState.alert
            }

        case types.DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                students: state.students.filter(item => item.id !== action.payload),
                itemsCount: state.itemsCount - 1,
                alert: {
                    color: 'success',
                    message: 'удален успешно!'
                }
            }

        case types.DELETE_STUDENT_FAILED:
            return {
                ...state,
                alert: {
                    color: 'danger',
                    message: 'ошибка!'
                }
            }

        case types.CHANGE_ITEMS_COUNT:
            return {
                ...state,
                visibleCount: action.payload
            }

        default:
            return state;
    }
};
