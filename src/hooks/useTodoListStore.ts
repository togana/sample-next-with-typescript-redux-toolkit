import { unwrapResult, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { addTodo as addTodoAction } from '../slices/todoListSlice';
import { asyncAddTodo as asyncAddTodoAction } from '../slices/asyncTodoListSlice';

export const useTodoListStore = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  const addTodo = useCallback(
    (args: string) => {
      dispatch(addTodoAction(args));
    },
    [dispatch]
  );

  const asyncAddTodo = useCallback(
    (args: string) => {
      dispatch(asyncAddTodoAction(args))
        .then(unwrapResult)
        .then((payload) => addTodo(payload))
        .catch((payload) => console.error(payload));
    },
    [dispatch]
  );

  return {
    addTodo,
    asyncAddTodo,
  };
};
