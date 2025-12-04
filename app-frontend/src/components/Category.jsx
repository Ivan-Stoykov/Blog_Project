import Post from "./Post";
export default function Category({ posts, handleDelete }) {

  return (
    <div className="grid md:grid-cols-2 gap-8">
            {posts.length !== 0 &&
              posts.map((post) => (
                  <Post
                    key={post.post.id}
                    post={post.post}
                    author={post.post.author}
                    comments={post.post.comments}
                    handleDelete={handleDelete}
                  />
              ))}
            {posts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-neutral-600">
                      No posts found.
                    </p>
                  </div>
                )}
        </div>
  );
}
