import { Link, useSearchParams } from "react-router-dom";

export default function Paginator({ pages, currentPage }) {
  const [, setParams] = useSearchParams();
  const renderedItems = [];
  if (!currentPage) currentPage = 1;
  for (let page = 1; page <= pages; page++)
    renderedItems.push(
        <button key={page}
          onClick={() => {
            setParams(`?page=${page}`);
          }}
          className={`w-10 h-10 rounded-md font-medium transition-all ${
            page == currentPage
              ? "bg-neutral-900 text-white"
              : "text-neutral-700 hover:bg-neutral-100"
          }`}
        >
          {page}
        </button>
    );
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {" "}
      <div className="flex gap-1">
        {renderedItems}
      </div>
    </div>
  );
}
