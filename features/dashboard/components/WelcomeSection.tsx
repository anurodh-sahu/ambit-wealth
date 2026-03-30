"use client";
export default function WelcomeSection({
  userName,
  inceptionDate,
}: {
  userName: string;
  inceptionDate: Date;
}) {
  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    }).format(d);
  return (
    <div className="flex flex-col gap-1">
      <div className="text-black font-sans text-[30px] font-light leading-[36px] tracking-normal">
        Welcome, {userName}
      </div>
      <div className="text-welcome-subtext font-sans text-sm font-light leading-[20px] tracking-normal">
        PORTFOLIO INCEPTION DATE {formatDate(inceptionDate)}
      </div>
    </div>
  );
}
