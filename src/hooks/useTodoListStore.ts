import { unwrapResult, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { addTodo as addTodoAction } from '../slices/todoListSlice';
import { asyncAddTodo as asyncAddTodoAction } from '../slices/asyncTodoListSlice';

export const useTodoListStore = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  const asyncAddTodo = useCallback(
    (args) => {
      dispatch(asyncAddTodoAction(args))
        .then(unwrapResult)
        .then((payload) => dispatch(addTodoAction(payload)))
        .catch((payload) => console.error(payload));
    },
    [dispatch]
  );

  return {
    asyncAddTodo,
  };
};
