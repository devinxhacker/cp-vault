import { useState, createContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Loader from './components/loader'
import User from './pages/user'
import Auth from './pages/auth'
import NotFound from './pages/404'
import AdminPortal from './pages/admin'


export const UserContext = createContext();
export const AdminContext = createContext();


function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    else {
      const savedAdmin = localStorage.getItem('admin');
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
        setIsLoggedIn(true);
      }
    }

    const loadtimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(loadtimer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const AuthProtector = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/auth/login" />;
    }

    return children;
  };


  return (
    <>
      <AdminContext.Provider value={{ admin, setAdmin, isLoggedIn, setIsLoggedIn }}>
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<AuthProtector><User /></AuthProtector>} />
              <Route path="/admin" element={<AuthProtector><AdminPortal /></AuthProtector>} />
              <Route path="/auth/login" element={<Auth authType={"login"} />} />
              <Route path="/auth/signup" element={<Auth authType={"signup"} />} />
              <Route path="/auth/logout" element={<Auth authType={"logout"} />} />
              <Route path="/auth/*" element={<Navigate to="/auth/login" />} />
              <Route path="/auth/register-cpvault/devinxauthio/789632145" element={<Auth authType={"adminsignup"} />} />
              <Route path="/404/*" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </AdminContext.Provider>
    </>
  )
}

export default App
