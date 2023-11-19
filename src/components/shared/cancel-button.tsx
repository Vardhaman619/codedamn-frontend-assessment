"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import type { PropsWithChildren } from "react";

export default function CancelButton({ children }: PropsWithChildren<object>) {
  const router = useRouter();
  function handelClick() {
    router.push("/");
  }
  return (
    <Button variant={"secondary"} onClick={handelClick}>
      {children ?? "Cancel"}
    </Button>
  );
}
