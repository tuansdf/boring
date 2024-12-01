import { cn } from "@/utils/classnames.ts";
import { ComponentProps, mergeProps, splitProps } from "solid-js";

type Props = {
  variant?: "primary" | "dark";
} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const [local, others] = splitProps(mergeProps({ variant: "primary" }, props), ["class", "variant"]);
  return <button class={cn(`btn btn-${local.variant}`, local.class)} {...others} />;
};
