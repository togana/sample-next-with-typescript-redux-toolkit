import { FC } from 'react';

export type TodoType = {
  id: number;
  message: string;
};

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
