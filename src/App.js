import React from 'react';
import { createContext } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages//Home/Home';
import './App.css'
import SignInForm from './pages/Login/LoginMain/SignInForm'
import SignUp from './pages/Login/LoginMain/SignUp'
import { AuthContextProvider } from './pages/Context/AuthContext'

export const UserContext = createContext();

const router = createBrowserRouter([
  { path: '/', element: <SignInForm /> },       // This is the sign-in page
  { path: '/home', element: <Home /> },        // This is the home page
  { path: '/register', element: <SignUp /> },  // This is the registration page
]);


function App() {
  return (
   
      <div>
       
         <AuthContextProvider>
        <RouterProvider router={router} />
        </AuthContextProvider>
       
      </div>
  
  );
}

export default App;
