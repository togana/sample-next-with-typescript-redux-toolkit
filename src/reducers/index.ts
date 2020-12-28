import { combineReducers } from 'redux'
import asyncTodoListSlice from '../slices/asyncTodoListSlice'
import todoListReducer from '../slices/todoListSlice'

export const rootReducer = combineReducers({
  asyncTodoList: asyncTodoListSlice,
  todoList: todoListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
