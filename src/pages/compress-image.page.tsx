import { Header } from "@/components/layout/header.tsx";
import { FileUpload } from "@/components/ui/file-upload.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { Select } from "@/components/ui/select.tsx";
import {
  DEFAULT_FILE_TYPE,
  DEFAULT_MAX_SIZE,
  DEFAULT_MAX_WIDTH_OR_HEIGHT,
  DEFAULT_QUALITY,
  MAX_MAX_SIZE,
  MAX_MAX_WIDTH_OR_HEIGHT,
  MAX_QUALITY,
  MIN_MAX_SIZE,
  MIN_MAX_WIDTH_OR_HEIGHT,
  MIN_QUALITY,
} from "@/features/compress-image/compress-image.constant.ts";
import { COMPRESS_IMAGE_OPTIONS } from "@/features/compress-image/compress-image.type.ts";
import {
  compressImagesWorker,
  initCompressImageWorker,
  terminateCompressImageWorker,
} from "@/features/compress-image/compress-image.util.ts";
import { clamp } from "@/utils/common.util.ts";
import { downloadFile } from "@/utils/file.util.ts";
import { createSignal, onCleanup, onMount, Show } from "solid-js";

export default function CompressImagePage() {
  const [quality, setQuality] = createSignal<number>(DEFAULT_QUALITY);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = createSignal<number>(DEFAULT_MAX_WIDTH_OR_HEIGHT);
  const [maxSize, setMaxSize] = createSignal<number>(DEFAULT_MAX_SIZE);
  const [fileType, setFileType] = createSignal<string>(DEFAULT_FILE_TYPE);
  const [isLoading, setIsLoading] = createSignal(false);
  const [processingTime, setProcessingTime] = createSignal<number | null>(null);

  const handleCompressImages = async (files: File[] | null) => {
    try {
      if (!files?.length) return;
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      const start = performance.now();
      let compressOptions: COMPRESS_IMAGE_OPTIONS = {
        quality: quality(),
        maxWidthOrHeight: maxWidthOrHeight(),
        fileType: fileType(),
        maxSize: maxSize(),
      };
      const compressedFiles = await compressImagesWorker({ files, options: compressOptions });
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
    initCompressImageWorker();
  });
  onCleanup(() => {
    terminateCompressImageWorker();
  });

  return (
    <>
      <Header title="Compress Image" />

      <div class="container-xxl p-3">
        <FileUpload accept="image/*" multiple onFiles={handleCompressImages} />
        <div class="row gap-3 gap-sm-0 mt-3">
          <Select
            containerClass="col-md"
            label="File type"
            value={fileType()}
            onInput={(e) => setFileType(e.currentTarget.value)}
          >
            <option value="image/jpeg">jpeg</option>
            <option value="image/webp">webp</option>
          </Select>
          <Input
            label="Quality"
            type="number"
            value={quality()}
            min={MIN_QUALITY}
            max={MAX_QUALITY}
            step={0.05}
            onInput={(e) => setQuality(Number(e.currentTarget.value))}
            onBlur={() => setQuality((prev) => clamp(prev, MIN_QUALITY, MAX_QUALITY))}
            containerClass="col-md"
          />
          <Input
            label="Max width or height"
            type="number"
            value={maxWidthOrHeight()}
            min={MIN_MAX_WIDTH_OR_HEIGHT}
            max={MAX_MAX_WIDTH_OR_HEIGHT}
            step={100}
            onInput={(e) => setMaxWidthOrHeight(Number(e.currentTarget.value))}
            onBlur={() => setMaxWidthOrHeight((prev) => clamp(prev, MIN_MAX_WIDTH_OR_HEIGHT, MAX_MAX_WIDTH_OR_HEIGHT))}
            containerClass="col-md"
          />
          <Input
            label="Max size (MB)"
            type="number"
            value={maxSize()}
            min={MIN_MAX_SIZE}
            max={MAX_MAX_SIZE}
            step={0.5}
            onInput={(e) => setMaxSize(Number(e.currentTarget.value))}
            onBlur={() => setMaxSize((prev) => clamp(prev, MIN_MAX_SIZE, MAX_MAX_SIZE))}
            containerClass="col-md"
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
