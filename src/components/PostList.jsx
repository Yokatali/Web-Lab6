import Post from './Post';

function PostList({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <div>
                    <Post key={post.id} title={post.title} body={post.body}/>
                </div>
            ))}
        </div>
    );
}

export default PostList;