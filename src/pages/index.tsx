import { NextPage } from 'next';
import Head from 'next/head';
import { InputForm } from '../features/todo/components/InputForm';
import { TodoList } from '../features/todo/components/TodoList';

type FormData = {
  todo: string;
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sample Next with TypeScript &amp; RTK</title>
      </Head>
      <InputForm />
      <TodoList />
    </div>
  );
};

export default Home;
