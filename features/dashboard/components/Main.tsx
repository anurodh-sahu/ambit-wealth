import { useHome } from "../hooks/useHome";
export default function Main() {
  const { loading, data, error } = useHome();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{data?.message}</div>;
}
