import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import App from './app/app';
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    {/* <StrictMode> */}
    <Provider store={store}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </StrictMode> */}
  </>
);
