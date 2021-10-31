import { NextPage } from 'next';
import Head from 'next/head';
import { InputForm, TodoList } from '../features/todo/components';

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
