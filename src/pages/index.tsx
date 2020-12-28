import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, NestedValue } from 'react-hook-form';
import { useTodoListStore } from '../hooks/useTodoListStore';
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
  const { addTodo, asyncAddTodo } = useTodoListStore();

  const onSubmit = handleSubmit(({ todo }) => {
    addTodo(todo);
    reset();
  });

  const onAsyncSubmit = handleSubmit(({ todo }) => {
    asyncAddTodo(todo);
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
