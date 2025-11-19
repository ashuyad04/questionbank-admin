export function Label({ children, className = "", ...props }) {
  return (
    <label className={`font-medium mb-1 block ${className}`} {...props}>
      {children}
    </label>
  );
}
