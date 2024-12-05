import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { COMPRESS_IMAGE_OPTIONS } from "@/types/compress-image.type.ts";
import { cn } from "@/utils/classnames.ts";
import { downloadFile } from "@/utils/file.util.ts";
import { compressImages } from "@/utils/image.util.ts";
import { ComponentProps, createSignal, createUniqueId, Show, splitProps } from "solid-js";
import classes from "src/components/ui/file-upload.module.scss";

type Props = {
  withCompression?: boolean | COMPRESS_IMAGE_OPTIONS;
} & ComponentProps<"input">;

export const FileUpload = (props: Props) => {
  const id = createUniqueId();
  let inputRef!: HTMLInputElement;
  const [local, others] = splitProps(props, ["class", "type", "onInput", "withCompression", "id"]);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleCompressImages = async (files: File[] | null) => {
    try {
      if (!files || !local.withCompression) return;
      if ((typeof props.withCompression === "boolean" && props.withCompression) || props.withCompression) {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 100));
        let compressOptions: COMPRESS_IMAGE_OPTIONS = {};
        if (typeof props.withCompression !== "boolean") {
          compressOptions = props.withCompression;
        }
        const compressedFiles = await compressImages({ files, options: compressOptions });
        compressedFiles.forEach((file) => {
          downloadFile(file);
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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
            try {
              if (typeof local.onInput === "function") {
                local.onInput?.(e);
              }
            } catch (e) {}
            await handleCompressImages(e.currentTarget.files as File[] | null);
            inputRef.value = "";
          }}
          {...others}
        />
      </div>

      <Show when={isLoading()}>
        <ScreenLoading />
      </Show>
    </>
  );
};
