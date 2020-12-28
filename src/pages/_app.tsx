import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { rootReducer } from '../reducers'

const store = configureStore({
  reducer: rootReducer
})

const App: NextPage<AppProps> = ({ Component }) => {
  return (
    <Provider store={store}>
      <Component />
    </Provider>
  );
};

export default App;
