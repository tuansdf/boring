import { Header } from "@/components/layout/header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { debounce } from "@/utils/common.util.ts";
import QRCode from "qrcode";
import { createEffect, createSignal, createUniqueId, Show } from "solid-js";

export default function QrCodeGeneratorPage() {
  let ref!: HTMLCanvasElement;
  const id = createUniqueId();
  const [content, setContent] = createSignal<string>("");

  const setContentDebounced = debounce(setContent, 200);

  const handleDownload = () => {
    const canvas = ref;
    const link = document.createElement("a");
    link.download = `qrcode-${new Date().getTime()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  createEffect(async () => {
    if (!content()) return;
    await QRCode.toCanvas(document.getElementById(id), content(), { width: 320, errorCorrectionLevel: "H", margin: 2 });
  });

  return (
    <>
      <Header title="QR Code Generator" />

      <div class="container-xxl p-3">
        <Input
          type="text"
          value={content()}
          onInput={(e) => setContentDebounced(e.currentTarget.value)}
          placeholder="Enter your content"
        />
        <Show when={content()}>
          <canvas id={id} ref={ref} class="d-block my-3"></canvas>
          <Button onClick={handleDownload}>Download</Button>
        </Show>
      </div>
    </>
  );
}
