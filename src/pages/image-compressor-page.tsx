import { Header } from "@/components/layout/header.tsx";
import { FileUpload } from "@/components/ui/file-upload.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Select } from "@/components/ui/select.tsx";
import { createSignal } from "solid-js";

export default function ImageCompressorPage() {
  const [quality, setQuality] = createSignal<number>(0.8);
  const [maxWidthOrHeight, setMaxWidthOrHeight] = createSignal<number>(10000);
  const [fileType, setFileType] = createSignal<string>("image/webp");

  return (
    <>
      <Header title="Image Compressor" />

      <div class="container-xxl p-3">
        <FileUpload
          withCompression={{ quality: quality(), maxWidthOrHeight: maxWidthOrHeight(), fileType: fileType() }}
          accept="image/*"
          multiple
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
      </div>
    </>
  );
}
