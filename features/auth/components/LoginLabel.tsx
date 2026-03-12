export default function LoginLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <label htmlFor="email" className="block text-xs font-medium">
      {children}
    </label>
  );
}
