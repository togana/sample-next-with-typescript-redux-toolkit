import { NextPage } from 'next';
import Head from 'next/head';
import { InputForm } from '../features/todo/InputForm';
import { List } from '../features/todo/List';

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
      <List />
    </div>
  );
};

export default Home;
