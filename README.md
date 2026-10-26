# Web-Lab6 - Post Dashboard

This is my React app for assignment 6. It gets posts from the JSONPlaceholder API and shows them. You can also filter the posts by title.

## How to run

```bash
npm install
npm run dev
```

## File organization

```
assignment6/
 ├─ src/
 │   ├─ api/
 │   │   └─ postsApi.js
 │   ├─ components/
 │   │   ├─ Post.jsx
 │   │   ├─ PostList.jsx
 │   │   └─ FilterForm.jsx
 │   ├─ reducer/
 │   │   └─ postsReducer.js
 │   ├─ App.jsx
 │   └─ main.jsx
 ├─ index.html
 └─ package.json
```

- `postsApi.js` has the `fetchPosts` function. It only fetches the data, there is no React in it.
- `postsReducer.js` has the initial state and the reducer for FETCH_START, FETCH_SUCCESS and FETCH_ERROR.
- `Post.jsx` shows one post (title and body).
- `PostList.jsx` gets the posts and shows a `Post` for each one with `.map()`.
- `FilterForm.jsx` is the input for filtering by title.
- `App.jsx` keeps the state with `useReducer`, fetches the posts when the page opens, and shows the loading, error and empty messages. The filter text is also kept here with `useState`.

## Challenges I faced

- `fetch` does not throw an error when the status is 404 or 500, so I had to check `response.ok` and throw the error myself.
- I was confused about the cleanup in `useEffect`. I used an `ignore` variable so the old request does not change the state after the component is gone.
- The filtered posts are not saved in state. I filter them while rendering, because the filtered list can be made from `posts` and the filter text.
- I made a typo in a file name (`FilterDorm.jsx`) and fixed it with `git mv`.
- I also put the `key` in the wrong place in `PostList` at first and got a warning, then fixed it.