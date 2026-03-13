export default function InputWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center w-full rounded-full border border-border px-4 py-3 bg-white">
      {children}
    </div>
  );
}
