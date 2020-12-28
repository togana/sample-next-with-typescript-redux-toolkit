import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, NestedValue } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { unwrapResult, ThunkDispatch, Action } from '@reduxjs/toolkit';
import { RootState } from '../reducers';
import { addTodo } from '../slices/todoListSlice';
import { asyncAddTodo } from '../slices/asyncTodoListSlice';
import { Input } from '../components/Todo/Input';
import { List } from '../components/Todo/List';

type FormData = {
  todo: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      todo: '',
    },
  });
  const dispatch = useDispatch();
  const onSubmit = handleSubmit(({ todo }) => {
    dispatch(addTodo(todo));
    reset();
  });

  const thunkDispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
  const onAsyncSubmit = handleSubmit(({ todo }) => {
    thunkDispatch(asyncAddTodo(todo))
      .then(unwrapResult)
      .then((payload) => dispatch(addTodo(payload)))
      .catch((payload) => console.error(payload));
    reset();
  });

  return (
    <div>
      <Head>
        <title>Sample Next with TypeScript &amp; RTK</title>
      </Head>
      <form onSubmit={onSubmit}>
        <Input name='todo' ref={register} />
        <button>追加</button>
        <button type='button' onClick={onAsyncSubmit}>1秒後に追加</button>
      </form>
      <List />
    </div>
  )
}

export default Home;
