export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="loader"></div>
      <p className="text-slate/50 text-sm font-medium">{text}</p>
    </div>
  );
}
