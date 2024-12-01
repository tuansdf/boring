import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, Show, splitProps } from "solid-js";

type Props = {
  label?: string;
} & ComponentProps<"input">;

export const Checkbox = (props: Props) => {
  const id = createUniqueId();
  const [local, others] = splitProps(props, ["class", "id", "label"]);

  return (
    <div class="form-check">
      <input class={cn("form-check-input", local.class)} type="checkbox" value="" id={id} {...others} />
      <Show when={local.label}>
        <label class="form-check-label" for={id}>
          {local.label}
        </label>
      </Show>
    </div>
  );
};
