import { Input, InputProps } from "@heroui/react";

export default function TextField(props: InputProps) {
  return (
    <Input
      classNames={{
        inputWrapper: " bg-white",
      }}
      {...props}
    />
  );
}
