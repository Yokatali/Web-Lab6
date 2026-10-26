import { useReducer, useEffect } from 'react';
import { fetchPosts } from './api/postsApi';
import { postsReducer, initialState } from './reducer/postsReducer';
import PostList from './components/PostList';

function App() {
  const [state, dispatch] = useReducer(postsReducer, initialState);

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

  let content;

  if (state.loading) {
    content = <p>Loading posts...</p>;
  } else if (state.error) {
    content = <p>Error: {state.error}</p>;
  } else if (state.posts.length === 0) {
    content = <p>No posts found.</p>;
  } else {
    content = <PostList posts={state.posts} />;
  }

  return (
    <div>
      <h1>Post Dashboard</h1>
      {content}
    </div>
  );
}

export default App;