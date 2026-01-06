const API = import.meta.env.VITE_API_URL;

// token helpers
export function setToken(token) {
  localStorage.setItem('token', token);
}
export function clearToken() {
  localStorage.removeItem('token');
}
export function getToken() {
  return localStorage.getItem('token');
}
function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// auth
export async function login(email, password) {
  const body = new URLSearchParams();
  body.append('username', email);
  body.append('password', password);

  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function signup(email, password) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Signup failed');
  return res.json();
}

export async function me() {
  const res = await fetch(`${API}/auth/me`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error('Not logged in');
  return res.json();
}

// posts (unchanged, but now includes token headers if you later protect them)
export async function getPosts() {
  const res = await fetch(`${API}/posts`, { headers: { ...authHeaders() } });
  return res.json();
}

export async function createPost(text) {
  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text }),
  });
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  return res.json();
}
