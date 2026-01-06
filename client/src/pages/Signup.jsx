import { useState } from 'react';
import { signup, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
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
      const data = await signup(email, password);
      setToken(data.access_token);
      nav('/');
    } catch (e) {
      setErr('Signup failed. Email may already exist or password is too long.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ maxWidth: 420, margin: '60px auto', fontFamily: 'system-ui' }}
    >
      <h2>Create account</h2>
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
          {loading ? 'Creating...' : 'Sign up'}
        </button>
        {err && <p style={{ color: 'crimson' }}>{err}</p>}
      </form>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </div>
  );
}
