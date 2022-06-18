import './App.css';
import Home from './pages/Home/Home';
import Setting from './pages/Setting/Setting';
import Login from './pages/Login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createContext, useContext } from 'react';
import auth from "./services/auth";
import { SnackbarProvider } from 'notistack';

const AuthContext = createContext();

function ProvideAuth({ children }) {
  const verify = auth();
  return (
    <AuthContext.Provider value={verify}>
      {children}
    </AuthContext.Provider>
  );
}

function PrivateRoute({ children }) {
  const auth = useContext(AuthContext);
  return (
    <Route render={() => auth ? (children) : <Redirect to="/Login" />} />
  );
}

function App() {
  return (
    <SnackbarProvider>
      <ProvideAuth>
        <Router>
          <Switch>
            <PrivateRoute exact path="/Home">
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/Setting">
              <Setting />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </SnackbarProvider>
  );
}

export default App;
