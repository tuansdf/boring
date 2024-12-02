import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, Show, splitProps } from "solid-js";

type Props = {
  containerClass?: string;
  label?: string;
} & ComponentProps<"input">;

export const Input = (props: Props) => {
  const [local, others] = splitProps(props, ["class", "id", "label", "containerClass"]);
  const id = createUniqueId();

  return (
    <div class={local.containerClass}>
      <Show when={local.label}>
        <label for={id} class="form-label">
          {local.label}
        </label>
      </Show>
      <input class={cn("form-control", local.class)} id={id} {...others} />
    </div>
  );
};
