import { cn } from "../utils/tailwind.utils.js";

export default function Pagebar({ currentPage, totalPages, onClick }) {
  return (
    <>
      <div className="flex justify-center py-8">
        <ul className="flex gap-4 rounded-full bg-gray-200 px-4 py-2 font-medium text-gray-600">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            return (
              <li key={page}>
                <a
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    page === currentPage && "bg-white",
                  )}
                  onClick={() => {
                    onClick(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
