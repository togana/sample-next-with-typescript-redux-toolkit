import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { TodoType } from '../../slices/todoListSlice';
import { Todo } from './Todo';

const todoList: TodoType[] = [
  { id: 1, message: 'todo!' },
  { id: 2, message: 'complete todo!' },
  { id: 3, message: 'complete todo!' },
];

export const List: FC = () => {
  const todoList = useSelector((state: RootState) => state.todoList)

  return (
    <ul>
      { todoList.map((todo: TodoType) => <Todo key={todo.id} todo={todo} />) }
    </ul>
  );
};
