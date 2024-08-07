import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  getAuth, onAuthStateChanged, signOut
} from "firebase/auth";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TranslatorApp from './BaseApp'
import ErrorPage from './component/ErrorPage';
import LoginPage from './Auth/login';
import SignUpPage from './Auth/signup';
import { AppContext } from './context/AppContext';
import Loader from './component/Loader';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <TranslatorApp /> : <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: user ? <TranslatorApp /> : <LoginPage />,
    },
    {
      path: "/signup",
      element: user ? <TranslatorApp /> : <SignUpPage />,
    },
  ]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (newUser) => {
      setLoading(false);
      if (newUser) {
        const uid = newUser.uid;
        console.log(uid);
        setUser(newUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  useEffect(()=>{
    console.log("new user added" , user)
  },[user]);

  const signOutUser = () => {
    signOut(getAuth())
      .then(() => {
        console.log("successfully signout");
      })
      .catch((error) => {
        console.log(`sign out error: ${error}`);
      });
  };
  return (
    <>
    {
      loading ?
      (<Loader />)
      : (

    <AppContext.Provider value={{user, setUser, signOutUser}}>
      <RouterProvider router={router} />
    </AppContext.Provider>
      )
    }
    
    {/* <Router>
    <Route path='/' Component={TranslatorApp} />
    <Route path='/login' Component={<>hello</>} />
    </Router> */}
    </>
  )
}

export default App
