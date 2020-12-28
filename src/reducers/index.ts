import { combineReducers } from 'redux'
import todoListReducer from '../slices/todoListSlice'

export const rootReducer = combineReducers({
  todoList: todoListReducer,
})

export type RootState = ReturnType<typeof rootReducer>
