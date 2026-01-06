import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomeFeed from './pages/HomeFeed';
import { getToken } from './api';

export default function App() {
  const token = getToken();

  return (
    <>
      <nav
        style={{
          padding: 12,
          display: 'flex',
          gap: 12,
          fontFamily: 'system-ui',
        }}
      >
        <Link to='/'>Home</Link>
        {!token && <Link to='/login'>Login</Link>}
        {!token && <Link to='/signup'>Signup</Link>}
      </nav>

      <Routes>
        {/* homefeed is / */}
        <Route
          path='/'
          element={token ? <HomeFeed /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={token ? <Navigate to='/' /> : <Login />}
        />
        <Route
          path='/signup'
          element={token ? <Navigate to='/' /> : <Signup />}
        />
      </Routes>
    </>
  );
}
