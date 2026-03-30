export default function TitleBar({
  filterLabel,
  asOnDate,
}: {
  filterLabel: string;
  filterValue: string;
  asOnDate: Date;
}) {
  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "UTC",
    }).format(d);
  return (
    <div className="flex justify-between items-center  text-sm ">
      <div className="flex items-center justify-center gap-2 uppercase text-center text-header font-sans text-lg  leading-7 tracking-normal">
        <span className="font-semibold">{filterLabel}</span>{" "}
        <span className="font-normal">
          as on {formatDate(asOnDate)}
        </span>
      </div>
    </div>
  );
}
