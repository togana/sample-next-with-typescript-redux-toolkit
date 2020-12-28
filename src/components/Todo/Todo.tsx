import { FC } from 'react';
import { TodoType } from '../../slices/todoListSlice'

export type TodoProps = {
  todo: TodoType;
};

export const Todo: FC<TodoProps> = ({ todo }) => {
  return (
    <li>
      <div>{todo.message}</div>
    </li>
  )
}
