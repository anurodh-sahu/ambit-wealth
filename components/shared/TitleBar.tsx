export default function TitleBar({
  filterLabel,
  asOnDate,
}: {
  filterLabel: string;
  filterValue: string;
  asOnDate: Date;
}) {
  return (
    <div className="flex justify-between items-center  text-sm ">
      <div className="flex items-center justify-center gap-2 uppercase text-center text-header font-sans text-lg  leading-7 tracking-normal">
        <span className="font-semibold">{filterLabel}</span>{" "}
        <span className="font-normal">
          as on {asOnDate.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
