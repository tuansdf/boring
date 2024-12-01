import { cn } from "@/utils/classnames.ts";
import { ComponentProps, mergeProps, splitProps } from "solid-js";

type Props = {
  variant?: "info" | "danger";
} & ComponentProps<"div">;

export const Alert = (props: Props) => {
  const [local, others] = splitProps(mergeProps({ variant: "info" }, props), ["class", "variant"]);
  return <div class={cn(`alert alert-${local.variant} mb-3`, local.class)} {...others}></div>;
};
