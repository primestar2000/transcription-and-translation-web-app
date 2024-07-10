import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TranslatorApp from './BaseApp'
import ErrorPage from './component/ErrorPage';
import LoginPage from './Auth/login';
import SignUpPage from './Auth/signup';
import { AppContext } from './context/AppContext';

function App() {
  const [user, setUser] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <TranslatorApp /> : <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
  ]);

  return (
    <>
    <AppContext.Provider value={{user}}>
      <RouterProvider router={router} />
    </AppContext.Provider>
    
    {/* <Router>
    <Route path='/' Component={TranslatorApp} />
    <Route path='/login' Component={<>hello</>} />
    </Router> */}
    </>
  )
}

export default App
