import { COMPRESS_IMAGE_OPTIONS } from "@/types/compress-image.type.ts";
import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, splitProps } from "solid-js";
import classes from "src/components/ui/file-upload.module.scss";

type Props = {
  withCompression?: boolean | COMPRESS_IMAGE_OPTIONS;
} & ComponentProps<"input">;

export const FileUpload = (props: Props) => {
  const id = createUniqueId();
  let inputRef!: HTMLInputElement;
  const [local, others] = splitProps(props, ["class", "type", "onInput", "withCompression", "id"]);

  return (
    <>
      <div class={classes["container"]}>
        <label class={cn(classes["dropzone"], local.class)} for={id}>
          <div>Drag your file(s) or click here</div>
        </label>

        <input
          id={id}
          ref={inputRef}
          type="file"
          class={classes["input"]}
          onInput={async (e) => {
            if (typeof local.onInput === "function") {
              await local.onInput?.(e);
            }
            inputRef.value = "";
          }}
          {...others}
        />
      </div>
    </>
  );
};
