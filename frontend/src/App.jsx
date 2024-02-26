import { GlobalContext } from './context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/AuthProvider';
import React from 'react';
import { useTheme } from './context/ThemeProvider';

function App() {
  const {themeMode} = useTheme();

  return (
    <div className="App">
      <AuthProvider>
        <GlobalContext>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={themeMode}
          />
          <RouterProvider router={router} />
        </GlobalContext>
      </AuthProvider>
    </div>
  );
}

export default App;
