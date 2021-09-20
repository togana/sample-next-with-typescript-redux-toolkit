import { Provider } from 'react-redux';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { store } from '../store';

const App: NextPage<AppProps> = ({ Component }) => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default App;
