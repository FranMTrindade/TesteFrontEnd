import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : null}
      </Routes>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
