import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/routes';

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
