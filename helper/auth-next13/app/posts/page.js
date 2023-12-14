import { cookies } from "next/headers";

const getPosts = async () => {
    const token = cookies().get('token');
    console.log(token);

    const resApi = await fetch('http://localhost:8000/api/posts', {
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    });

    if (resApi.ok) {
        const data = await resApi.json();
        return data.posts;
    } else {
        throw new Error(resApi.status);
    }
}

const PostPage = async () => {
    const posts = await getPosts()

    return (
        <div className="container mt-5">
            <div className="row g-3">
                {posts.map(post => (
                    <div key={post.id} className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PostPage;