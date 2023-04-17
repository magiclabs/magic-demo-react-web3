import React from 'react';
import Login from './pages/login';
import Home from './pages/home';
import { useUser } from './contexts/UserContext';
import './styles.css';

export default function App() {
  const { user } = useUser();

  return !user ? <Login /> : <Home />;
}
