import { FC } from 'react';
import { useTodoListStore } from '../../hooks/useTodoListStore';
import { TodoType } from '../../slices/todoListSlice';
import { Todo } from './Todo';

export const List: FC = () => {
  const { todoList } = useTodoListStore();

  return (
    <ul>
      { todoList.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />) }
    </ul>
  );
};
