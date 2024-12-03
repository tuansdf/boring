import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { cn } from "@/utils/classnames.ts";
import { downloadFile } from "@/utils/file.util.ts";
import { COMPRESS_IMAGE_OPTIONS, compressImage } from "@/utils/image.util.ts";
import { ComponentProps, createSignal, createUniqueId, Show, splitProps } from "solid-js";
import classes from "src/components/ui/file-upload.module.scss";

const compressAndDownloadImage = async (file: File, options: COMPRESS_IMAGE_OPTIONS, onSuccess?: () => any) => {
  const compressed = await compressImage(file, options);
  downloadFile(compressed);
  await onSuccess?.();
};

type Props = {
  withCompression?: boolean | COMPRESS_IMAGE_OPTIONS;
} & ComponentProps<"input">;

export const FileUpload = (props: Props) => {
  const id = createUniqueId();
  let inputRef!: HTMLInputElement;
  const [local, others] = splitProps(props, ["class", "type", "onInput", "withCompression", "id"]);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleCompressImages = async (files: FileList | null) => {
    try {
      if (!files || !local.withCompression) return;
      if ((typeof props.withCompression === "boolean" && props.withCompression) || props.withCompression) {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 100));
        let compressOptions: COMPRESS_IMAGE_OPTIONS = {};
        if (typeof props.withCompression !== "boolean") {
          compressOptions = props.withCompression;
        }
        const promises: Promise<any>[] = [];
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.startsWith("image/")) continue;
          promises.push(compressAndDownloadImage(files[i], compressOptions));
        }
        await Promise.all(promises);
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
            await handleCompressImages(e.currentTarget.files);
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
