export default function Comments({ comment }) {
  return (
    <div className="flex space-x-3 py-4 border-b border-gray-100">
      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-800">
          {comment.author.name}
        </p>
        <p className="text-xs text-gray-500 mb-2">{comment.createdAt}</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.body}</p>
      </div>
    </div>
  );
}
