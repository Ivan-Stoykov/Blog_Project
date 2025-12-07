
export default function DeleteButton({ handleDelete }) {

  return <button onClick={handleDelete} className="px-3 py-1 text-xs font-medium rounded-full transition duration-150 bg-red-500 text-white hover:bg-red-600">Delete</button>;
}
