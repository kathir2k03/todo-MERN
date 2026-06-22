import axios from "axios"
import { clearTodoValues, createTodoFail, createTodoRequest, createTodoSuccess, deleteTodoFail, deleteTodoRequest, deleteTodoSuccess, todoFail, todoRequest, todosFail, todosRequest, todosSuccess, todoSucces, updateTodoFail, updateTodoRequest, updateTodoSuccess } from "../slices/todoSlice"
import API from "../config/api"

export const getTodos = () => async (dispatch) => {
    try {
        dispatch(todosRequest())
        const {data} = await axios.get(`${API}/todos`)
        dispatch(todosSuccess(data))
    }
    catch(error){
       dispatch(todosFail(error?.response?.data?.message || error.message)) 
    }
}

export const createTodo = (newTodo) => async (dispatch) => {
    try {
        dispatch(createTodoRequest())
        const { data } = await axios.post(`${API}/todos`,newTodo)
        dispatch(createTodoSuccess(data))
         dispatch(getTodos());
    } catch (error) {
        dispatch(createTodoFail(error?.response?.data?.message || error.message))
    }
}

export const getTodo = (id) => async (dispatch) => {
    try {
        dispatch(todoRequest())
        const {data} = await 
        axios.get(`${API}/todo`,
            dispatch(todoSucces(data))
        )
    }
    catch(error){
        dispatch(todoFail(error?.response?.data?.message || error.message))
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    try {
        dispatch(deleteTodoRequest())
        const {data} = await axios.delete(`${API}/todo/${id}`)
        dispatch(deleteTodoSuccess(data))
        dispatch(getTodos());
    }
    catch (error){
        dispatch(deleteTodoFail(error?.response?.data?.message || error.message))
    }
}

export const editTodo = (id, formData) => async (dispatch) => {
    try {
        dispatch(updateTodoRequest())
        await axios.put(`${API}/todo/${id}`,formData)
        dispatch(updateTodoSuccess())
        dispatch(getTodos());
    } catch (error){
        dispatch(updateTodoFail(error?.response?.data?.message || error.message))
    }
}

