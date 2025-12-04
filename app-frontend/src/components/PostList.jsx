import Post from "./Post";
export default function PostList({posts, handleDelete}) {
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
        {posts.length !== 0 &&
          posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                author={post.author}
                comments={post.comments}
                handleDelete={handleDelete}
              />
          ))}
        {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600">
                  No posts found in this category.
                </p>
              </div>
            )}
    </div>
  );
}
