import { Button } from "@/components/ui/Button";
import { useHome } from "../hooks/useHome";
export default function Main() {
  const { loading, data, error } = useHome();
  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error} <Button variant={"outline"}>Click me</Button>{" "}
        <Button variant={"outline"} disabled={true}>
          Click me
        </Button>
        <Button variant={"link"}>Click me</Button>
        <Button variant={"link"} disabled={true}>
          Click me
        </Button>
      </div>
    );
  return <div>{data?.message}</div>;
}
