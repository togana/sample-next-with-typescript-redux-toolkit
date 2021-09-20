import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTodoListStore } from './useTodoListStore';

export const InputForm: FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      todo: '',
    },
  });
  const { addTodo, asyncAddTodo, isPending } = useTodoListStore();

  const onSubmit = handleSubmit(({ todo }) => {
    addTodo(todo);
    reset();
  });

  const onAsyncSubmit = handleSubmit(({ todo }) => {
    asyncAddTodo(todo);
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <input {...register('todo')} />
      <button>追加</button>
      <button type="button" disabled={isPending} onClick={onAsyncSubmit}>
        1秒後に追加
      </button>
    </form>
  );
};
