import { cn } from "@/utils/classnames.ts";
import { ComponentProps, splitProps } from "solid-js";

type Props = {
  variant?: "primary" | "dark";
} & ComponentProps<"button">;

export const Button = (props: Props) => {
  const [local, others] = splitProps(props, ["class", "variant"]);
  return <button class={cn(`btn btn-${local.variant || "primary"}`, local.class)} {...others} />;
};
