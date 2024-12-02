import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, Show, splitProps } from "solid-js";

type Props = {
  letterCount?: number;
  maxLetterCount?: number;
  errorMessage?: string;
  label?: string;
} & ComponentProps<"textarea">;

export const Textarea = (props: Props) => {
  const [local, others] = splitProps(props, ["class", "errorMessage", "letterCount", "maxLetterCount", "id", "label"]);
  const id = createUniqueId();

  return (
    <div>
      <Show when={local.label}>
        <label for={id} class="form-label">
          {local.label}
        </label>
      </Show>
      <textarea id={id} class={cn("form-control", !!local.errorMessage && "border-danger", local.class)} {...others} />
      <Show when={local.errorMessage || local.letterCount === 0 || local.letterCount}>
        <div class="d-flex justify-content-between">
          <Show when={local.errorMessage} fallback={<div></div>}>
            <div class="form-text text-danger fs-6 m-0">{local.errorMessage}</div>
          </Show>
          <Show when={local.letterCount === 0 || local.letterCount}>
            <span classList={{ "text-secondary fs-6": true, "text-danger": !!local.errorMessage }}>
              {local.letterCount}
              <Show when={local.maxLetterCount}>{`/${local.maxLetterCount}`}</Show>
            </span>
          </Show>
        </div>
      </Show>
    </div>
  );
};
