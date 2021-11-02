import { store } from '../store';
import type { EntityId } from '@reduxjs/toolkit';
import type { TodoType } from '../features/todo/slices/todoListSlice';
import type { RootState } from '../store';

export const createTodoListState = (todoList: TodoType[]) => {
  const map = new Map<EntityId, TodoType>();
  todoList.forEach((todo) => {
    map.set(todo.id, todo);
  });

  return {
    ids: Array.from(map.keys()),
    entities: Object.fromEntries(map.entries()),
  };
};

export const createMockStore = (initData: Partial<RootState>) => {
  return { ...store.getState(), ...initData };
};
