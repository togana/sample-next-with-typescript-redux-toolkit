import { FC } from 'react';
import { Todo, TodoType } from './Todo';

const todoList: TodoType[] = [
  { id: 1, message: 'todo!' },
  { id: 2, message: 'complete todo!' },
  { id: 3, message: 'complete todo!' },
];

export const List: FC = () => (
  <ul>
    { todoList.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />) }
  </ul>
);
