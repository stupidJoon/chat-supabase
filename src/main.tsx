import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Auth from './Auth.tsx';
import Channel from './Channel';
import 'normalize.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/channels',
    element: <Channel />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render((
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
));
