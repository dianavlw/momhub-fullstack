const API = import.meta.env.VITE_API_URL;

export async function getPosts() {
  const res = await fetch(`${API}/posts`);
  if (!res.ok) throw new Error('Failed to load posts');
  return res.json();
}

export async function createPost(text) {
  const res = await fetch(`${API}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}
