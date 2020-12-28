import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { delTodo, updateTodo } from '../../slices/todoListSlice';
import { TodoType } from '../../slices/todoListSlice'

export type TodoProps = {
  todo: TodoType;
};

export const Todo: FC<TodoProps> = ({ todo }) => {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(delTodo(todo.id))
  }

  const onUpdate = () => {
    dispatch(updateTodo({ id: todo.id, message: '変更！！！' }));
  }

  return (
    <li>
      <div>{todo.message}</div>
      <button onClick={onUpdate}>更新</button>
      <button onClick={onDelete}>削除</button>
    </li>
  )
}
