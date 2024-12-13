import { cn } from "@/utils/classnames.ts";
import { ComponentProps, splitProps } from "solid-js";

type Props = {
  variant?: "info" | "danger" | "dark" | "light";
} & ComponentProps<"div">;

export const Alert = (props: Props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return <div class={cn(`alert alert-${local.variant || "info"}`, local.class)} {...others}></div>;
};
