import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

// react query 를 사용하기 위해서는 client 를 만들어야한다.
const queryClient = new QueryClient();

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById('root')
);
