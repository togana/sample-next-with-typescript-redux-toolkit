import {
  unwrapResult,
  ThunkDispatch,
  Action,
  EntityId,
} from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxToolKit';
import { RootState } from '../../store';
import { TodoType, actions, selectors } from './todoListSlice';
import {
  actions as asyncActions,
  selectors as asyncSelectors,
} from './asyncTodoListSlice';

export const useTodoListStore = () => {
  const todoList = useAppSelector(selectors.todoListSelector);
  const isPending = useAppSelector(asyncSelectors.isPendingSelector);

  const dispatch = useAppDispatch();

  const addTodo = useCallback(
    (args: string) => {
      dispatch(actions.addTodo(args));
    },
    [dispatch]
  );

  const updateTodo = useCallback(
    (args: Omit<TodoType, "createdAt">) => {
      dispatch(actions.updateTodo(args));
    },
    [dispatch]
  );

  const delTodo = useCallback(
    (args: EntityId) => {
      dispatch(actions.delTodo(args));
    },
    [dispatch]
  );

  const asyncAddTodo = useCallback(
    (args: string) => {
      dispatch(asyncActions.asyncAddTodo(args))
        .then(unwrapResult)
        .then((payload) => addTodo(payload))
        .catch((payload) => console.error(payload));
    },
    [addTodo, dispatch]
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
