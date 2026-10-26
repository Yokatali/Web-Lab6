import { useState, useReducer, useEffect } from 'react';
import { fetchPosts } from './api/postsApi';
import { postsReducer, initialState } from './reducer/postsReducer';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadPosts() {
      dispatch({ type: 'FETCH_START' });

      try {
        const data = await fetchPosts();
        if (!ignore) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }
      } catch (error) {
        if (!ignore) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredPosts = state.posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  let content;

  if (state.loading) {
    content = <p>Loading posts...</p>;
  } else if (state.error) {
    content = <p>Error: {state.error}</p>;
  } else if (state.posts.length === 0) {
    content = <p>No posts found.</p>;
  } else if (filteredPosts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <PostList posts={filteredPosts} />;
  }

  return (
    <div>
      <h1>Post Dashboard</h1>
      <FilterForm filter={filter} onFilterChange={setFilter} />
      {content}
    </div>
  );
}

export default App;