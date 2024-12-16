import { cn } from "@/utils/classnames.ts";
import { ComponentProps, createUniqueId, splitProps } from "solid-js";
import classes from "./file-upload.module.scss";

type Props = {
  onFiles: (files: File[] | null) => any | Promise<any>;
} & ComponentProps<"input">;

export const FileUpload = (props: Props) => {
  const id = createUniqueId();
  let inputRef!: HTMLInputElement;
  const [local, others] = splitProps(props, ["class", "type", "onFiles", "onInput", "id"]);

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
            let files = e.currentTarget.files as File[] | null;
            if (files) files = [...files];
            inputRef.value = "";
            await local.onFiles(files);
          }}
          {...others}
        />
      </div>
    </>
  );
};