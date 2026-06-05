import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Feed from './pages/Feed';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import axios from 'axios';

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <Feed /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
        {user && <BottomNav />}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
