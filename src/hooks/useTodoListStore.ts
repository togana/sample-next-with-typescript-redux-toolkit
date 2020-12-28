import { unwrapResult, ThunkDispatch, Action, EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import {
  TodoType,
  addTodo as addTodoAction,
  updateTodo as updateTodoAction,
  delTodo as delTodoAction,
  selectors,
} from '../slices/todoListSlice';
import { asyncAddTodo as asyncAddTodoAction, selectors as asyncSelectors } from '../slices/asyncTodoListSlice';

export const useTodoListStore = () => {
  const todoList = useSelector(selectors.todoListSelector);
  const isPending = useSelector(asyncSelectors.isPendingSelector);

  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();

  const addTodo = useCallback(
    (args: string) => {
      dispatch(addTodoAction(args));
    },
    [dispatch]
  );

  const updateTodo = useCallback(
    (args: TodoType) => {
      dispatch(updateTodoAction(args));
    },
    [dispatch]
  );

  const delTodo = useCallback(
    (args: EntityId) => {
      dispatch(delTodoAction(args));
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
    updateTodo,
    delTodo,
    asyncAddTodo,
    todoList,
    isPending,
  };
};
