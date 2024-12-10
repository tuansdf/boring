import { Header } from "@/components/layout/header.tsx";
import { FileUpload } from "@/components/ui/file-upload.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { Select } from "@/components/ui/select.tsx";
import { COMPRESS_IMAGE_OPTIONS } from "@/types/compress-image.type.ts";
import { downloadFile } from "@/utils/file.util.ts";
import { compressImages, terminateWorker } from "@/utils/image.util.ts";
import { createSignal, onCleanup, onMount, Show } from "solid-js";

export default function ImageCompressorPage() {
  const [quality, setQuality] = createSignal<number>(0.9);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = createSignal<number>(4000);
  const [fileType, setFileType] = createSignal<string>("image/webp");
  const [isLoading, setIsLoading] = createSignal(false);
  const [processingTime, setProcessingTime] = createSignal<number | null>(null);

  const handleCompressImages = async (files: File[] | null) => {
    try {
      if (!files) return;
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      const start = performance.now();
      let compressOptions: COMPRESS_IMAGE_OPTIONS = {
        quality: quality(),
        maxWidthOrHeight: maxWidthOrHeight(),
        fileType: fileType(),
      };
      const compressedFiles = await compressImages({ files, options: compressOptions });
      compressedFiles.forEach((file) => {
        downloadFile(file);
      });
      setProcessingTime(performance.now() - start);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  onMount(() => {
    window.addEventListener("beforeunload", terminateWorker);
  });
  onCleanup(() => {
    terminateWorker();
    window.removeEventListener("beforeunload", terminateWorker);
  });

  return (
    <>
      <Header title="Image Compressor" />

      <div class="container-xxl p-3">
        <FileUpload
          accept="image/*"
          multiple
          onInput={(e) => handleCompressImages(e.currentTarget.files as File[] | null)}
        />
        <div class="row gap-3 gap-sm-0 mt-3">
          <Select containerClass="col-sm" label="File type" onInput={(e) => setFileType(e.currentTarget.value)}>
            <option value="image/webp">webp</option>
            <option value="image/jpeg">jpeg</option>
          </Select>
          <Input
            label="Quality"
            type="number"
            value={quality()}
            min={0.05}
            max={1}
            step={0.05}
            onInput={(e) => setQuality(Number(e.currentTarget.value))}
            containerClass="col-sm"
          />
          <Input
            label="Max width or height"
            type="number"
            value={maxWidthOrHeight()}
            min={100}
            max={1_000_000}
            step={100}
            onInput={(e) => setMaxWidthOrHeight(Number(e.currentTarget.value))}
            containerClass="col-sm"
          />
        </div>
        <Show when={processingTime() === 0 || processingTime()}>
          <div class="text-end font-monospace mt-3">done in {processingTime()}ms</div>
        </Show>
      </div>

      <Show when={isLoading()}>
        <ScreenLoading />
      </Show>
    </>
  );
}