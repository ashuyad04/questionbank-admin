export function Button({ children, className = "", type = "submit", ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
