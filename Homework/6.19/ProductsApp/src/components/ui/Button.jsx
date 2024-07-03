export default function Button({ type, onClick, children }) {
  return (
    <>
      <button
        type={type}
        className="rounded-lg bg-blue-500 py-4 text-lg font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {children}
      </button>
    </>
  );
}
