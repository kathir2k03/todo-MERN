import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name : 'todos',

    initialState: {
        loading : false,
        todos : [],
        todo : {},
        error : null,
        isTodoUpdated : false,
        isTodoDeleted : null,
        successMessage: null
    },
    reducers : {
        todosRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        todosSuccess(state, action){
            return {
                ...state,
                loading : false,
                todos : action.payload
            }
        },
        todosFail(state, action){
            return{
                ...state,
                loading : false,
                error: action.payload
            }
        },
        createTodoRequest(state, action){
            return{
                ...state,
                loading : true
            }
        },
        createTodoSuccess(state, action){
            return{
                ...state,
                loading : false,
                successMessage : action.payload.message
            }
        },
        createTodoFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        todoRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        todoSuccess(state, action){
            return {
                ...state,
                loading : false,
                todo: action.payload.todo
            }
        },
        todoFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteTodoRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        deleteTodoSuccess(state, action){
            return{
                ...state,
                loading : false,
                isTodoDeleted : action.payload.message
            }
        },
        deleteTodoFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        updateTodoRequest(state, action){
            return{
                ...state,
                loading : true,
            }
        },
        updateTodoSuccess(state, action){
            return{
                ...state,
                loading : false,
                isTodoUpdated : true
            }
        },
        updateTodoFail(state, action){
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        }
    }
})

const {actions, reducer} = todoSlice

export const {
todosRequest, todosSuccess, todosFail, createTodoRequest, createTodoSuccess, createTodoFail, todoRequest, todoSucces, todoFail, deleteTodoRequest, deleteTodoSuccess, deleteTodoFail, updateTodoRequest, updateTodoFail, clearTodoValues
} = actions

export default reducer