import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { downloadFile } from "@/utils/file.util.ts";
import { COMPRESS_IMAGE_OPTIONS, compressImage } from "@/utils/image.util.ts";
import { FileUpload, useFileUpload } from "@ark-ui/solid/file-upload";
import { createSignal, For, Show } from "solid-js";

const compressAndDownloadImage = async (file: File, options: COMPRESS_IMAGE_OPTIONS, onSuccess?: () => any) => {
  const compressed = await compressImage(file, options);
  downloadFile(compressed);
  await onSuccess?.();
};

type Props = {
  onChange?: (files: File[]) => any;
  withCompression?: boolean | COMPRESS_IMAGE_OPTIONS;
};

export const ImageUpload = (props: Props) => {
  const [isLoading, setIsLoading] = createSignal(false);

  const fileUpload = useFileUpload({
    maxFiles: 100,
    accept: "image/*",
    onFileAccept: async (details) => {
      try {
        await props.onChange?.(details.files);
        if ((typeof props.withCompression === "boolean" && props.withCompression) || props.withCompression) {
          setIsLoading(true);
          await new Promise((r) => setTimeout(r, 100));
          let compressOptions: COMPRESS_IMAGE_OPTIONS = {};
          if (typeof props.withCompression !== "boolean") {
            compressOptions = props.withCompression;
          }
          const promises: Promise<any>[] = [];
          for (let i = 0; i < details.files.length; i++) {
            promises.push(
              compressAndDownloadImage(details.files[i], compressOptions, () =>
                fileUpload().deleteFile(details.files[i]),
              ),
            );
          }
          await Promise.all(promises);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <FileUpload.RootProvider value={fileUpload}>
        <FileUpload.Dropzone>
          <FileUpload.Label>Drag your file(s) here</FileUpload.Label>
          <FileUpload.Trigger class="btn btn-primary">Choose file(s)</FileUpload.Trigger>
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {(context) => (
              <For each={context().acceptedFiles}>
                {(file) => (
                  <FileUpload.Item file={file}>
                    <div>
                      <FileUpload.ItemName />
                      <FileUpload.ItemSizeText />
                    </div>
                  </FileUpload.Item>
                )}
              </For>
            )}
          </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.HiddenInput />
      </FileUpload.RootProvider>

      <Show when={isLoading()}>
        <ScreenLoading />
      </Show>
    </>
  );
};
