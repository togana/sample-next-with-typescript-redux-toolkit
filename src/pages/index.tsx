import { NextPage } from 'next';
import Head from 'next/head';
import { useForm, NestedValue } from 'react-hook-form';
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
  const onSubmit = handleSubmit(({ todo }) => {
    console.log('submit:', todo)
    reset();
  });

  return (
    <div>
      <Head>
        <title>Sample Next with TypeScript &amp; RTK</title>
      </Head>
      <form onSubmit={onSubmit}>
        <Input name='todo' ref={register} />
      </form>
      <List />
    </div>
  )
}

export default Home;
