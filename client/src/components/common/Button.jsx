import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300",
    outline: "border border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={16} className="mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}