export default function ForgotLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-inter text-primary text-xs font-regular whitespace-nowrap ml-2"
    >
      {children}
    </a>
  );
}
