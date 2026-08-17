import { Loader2 } from "lucide-react";

export default function Loader({ size = "md", fullScreen = false, text = "Loading..." }) {
  const sizes = {
    sm: 20,
    md: 32,
    lg: 48,
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 size={sizes[size] || sizes.md} className="animate-spin text-blue-600" />
      {text && <p className="text-xs font-medium text-slate-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {loaderContent}
      </div>
    );
  }

  return <div className="p-6 flex items-center justify-center">{loaderContent}</div>;
}