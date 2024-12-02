import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, JSXElement, Show, splitProps } from "solid-js";

type Props = {
  containerClass?: string;
  label?: string;
  children?: JSXElement;
} & ComponentProps<"select">;

export const Select = (props: Props) => {
  const [local, others] = splitProps(props, ["class", "id", "label", "containerClass"]);
  const id = createUniqueId();

  return (
    <div class={local.containerClass}>
      <Show when={local.label}>
        <label for={id} class="form-label">
          {local.label}
        </label>
      </Show>
      <select class={cn("form-select", local.class)} id={id} {...others}>
        {props.children}
      </select>
    </div>
  );
};
