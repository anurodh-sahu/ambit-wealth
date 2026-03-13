import Image from "next/image";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0  object-cover w-full h-full z-0 max-h-[400px] max-w-[400px] mx-auto"
      >
        <source src="/tree-animation.mp4" type="video/mp4" />
      </video> */}

      {children}
    </div>
  );
}
