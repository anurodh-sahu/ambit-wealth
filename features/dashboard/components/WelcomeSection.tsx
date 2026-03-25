export default function WelcomeSection({
  userName,
  inceptionDate,
}: {
  userName: string;
  inceptionDate: Date;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-black font-sans text-[30px] font-light leading-[36px] tracking-normal">
        Welcome, {userName}
      </div>
      <div className="text-welcome-subtext font-sans text-sm font-light leading-[20px] tracking-normal">
        PORTFOLIO INCEPTION DATE {inceptionDate.toLocaleDateString()}
      </div>
    </div>
  );
}
