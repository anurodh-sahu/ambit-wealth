import Image from "next/image";
export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="ambit-logo"
      width={112}
      height={62}
      className="w-[112px] h-[62px]"
    />
  );
}
