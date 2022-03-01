import { useState } from 'react';

import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';

export default function App() {
  // Dummy login
  async function login(user = null) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Dummy logout
  async function logout() {
    localStorage.removeItem('user');
  }

  return (
    <div>
      <Navbar logout={logout} />
      <Main login={login} />
    </div>
  );
}
