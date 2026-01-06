import { useState } from 'react';
import { login, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const data = await login(email, password);
      setToken(data.access_token);
      nav('/');
    } catch (e) {
      setErr('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 420, margin: '60px auto', fontFamily: 'system-ui' }}
    >
      <h2>Sign in</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        <button disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
        {err && <p style={{ color: 'crimson' }}>{err}</p>}
      </form>
      <p style={{ marginTop: 12 }}>
        New here? <Link to='/signup'>Create an account</Link>
      </p>
    </div>
  );
}
