import { combineReducers, configureStore } from '@reduxjs/toolkit';
import asyncTodoListSlice from './features/todo/slices/asyncTodoListSlice';
import todoListReducer from './features/todo/slices/todoListSlice';

export const rootReducer = combineReducers({
  asyncTodoList: asyncTodoListSlice,
  todoList: todoListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
