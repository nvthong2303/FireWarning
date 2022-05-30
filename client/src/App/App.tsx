import logo from '../logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import React, { createContext, useContext, ReactNode, Component } from 'react'
import auth from '../guards/auth';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

const AuthContext = createContext(null);

type Props = {
  children: ReactNode;
};

function ProvideAuth({ children }: Props) {
  const verify = auth() as any;

  return (
    <AuthContext.Provider value={verify}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children, ...rest }: any) => {
  const auth = useContext(AuthContext);
  return (
    <Route 
      {...rest} 
      render={(props: any) => 
        auth
        ? <Component {...props} />
        : <Navigate to='/login' />
      } 
    />
  )
}

function App() {
  console.log('app')

  return (
    <ProvideAuth>
      <Router>
        <Routes>
          <PrivateRoute exact path='/' >
            <Home />
          </PrivateRoute>
          <Route path='/login' >
            <Login />
          </Route>
        </Routes>
      </Router>
    </ProvideAuth>
  );
}

export default App;
