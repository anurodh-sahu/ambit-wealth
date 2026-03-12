import React from "react";

interface LoginInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function LoginInput({ className, ...props }: LoginInputProps) {
  return (
    <input
      className={`flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground px-1 ${className ?? ""}`}
      {...props}
    />
  );
}
