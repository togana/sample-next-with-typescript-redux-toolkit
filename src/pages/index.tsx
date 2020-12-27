import { NextPage } from 'next';
import Head from 'next/head';
import { List } from '../components/Todo/List';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sample Next with TypeScript &amp; RTK</title>
      </Head>
      <List />
    </div>
  )
}

export default Home;
