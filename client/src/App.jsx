import { useEffect, useState } from 'react';
import { getPosts, createPost, deletePost } from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');

  async function load() {
    const data = await getPosts();
    setPosts(data);
  }

  async function onSubmit(e) {
    e.preventDefault();
    await createPost(text);
    setText('');
    load();
  }

  async function onDelete(id) {
    await deletePost(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Momhub</h1>

      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Write a post...'
        />
        <button>Post</button>
      </form>

      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            {p.text}
            <button onClick={() => onDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
