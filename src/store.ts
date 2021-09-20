import { combineReducers, configureStore } from '@reduxjs/toolkit';
import asyncTodoListSlice from './features/todo/asyncTodoListSlice';
import todoListReducer from './features/todo/todoListSlice';

export const rootReducer = combineReducers({
  asyncTodoList: asyncTodoListSlice,
  todoList: todoListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
