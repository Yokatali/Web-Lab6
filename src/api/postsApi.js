export async function fetchPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

    if (!response.ok) {
        throw new Error(`Failed to fetch posts (status ${response.status})`);
    }
    return response.json();
}