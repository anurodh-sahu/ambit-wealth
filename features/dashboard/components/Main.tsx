import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/shared/DateRangePicker";
import { useHome } from "../hooks/useHome";
export default function Main() {
  const { loading, data, error } = useHome();
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error}{" "}
        <div className="mt-4">
          <DateRangePicker mode="modal" />
        </div>
        <Button size={"sm"} shape={"pill"}>
          Click me
        </Button>{" "}
        <DateRangePicker inceptionDate={new Date(2020, 0, 1)} />
        <Button size={"sm"} shape={"pill"} variant={"outline"}>
          Click me
        </Button>
        <Button
          variant={"image"}
          shape={"pill"}
          icon={<CalendarIcon />}
          bgImage="/tree.png"
        >
          Click me
        </Button>
        <Button variant={"link"} icon={<CalendarIcon />}>
          Click me
        </Button>
        <Button variant={"link"} disabled={true}>
          Click me
        </Button>
      </div>
    );
  return <div>{data?.message}</div>;
}
