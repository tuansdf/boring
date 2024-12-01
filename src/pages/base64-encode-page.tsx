import { Header } from "@/components/layout/header.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { encodeBase64 } from "@/utils/base64.ts";
import { debounce } from "@/utils/common.util.ts";
import { createSignal, Show } from "solid-js";

export default function Base64EncodePage() {
  const [input, setInput] = createSignal<string>("");
  const [output, setOutput] = createSignal<string>("");
  const [withCompression, setWithCompression] = createSignal<boolean>(false);
  const [isUrlSafe, setIsUrlSafe] = createSignal<boolean>(false);
  const [processingMs, setProcessingMs] = createSignal<number | null>(null);

  const handleSubmit = () => {
    const start = performance.now();
    setOutput(encodeBase64(input(), { url: isUrlSafe(), compression: withCompression() }));
    setProcessingMs(performance.now() - start);
  };

  const handleSubmitDebounced = debounce(handleSubmit);

  return (
    <>
      <Header title="Base64 Encode" />

      <div class="container-xxl p-3">
        <form class="d-flex flex-column gap-3">
          <Textarea
            label="Input"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
              handleSubmitDebounced();
            }}
            rows={12}
            letterCount={input().length}
          />
          <div class="d-flex flex-column gap-3 align-items-start">
            <Checkbox
              label="URL-safe"
              checked={isUrlSafe()}
              onInput={(e) => {
                setIsUrlSafe(e.currentTarget.checked);
                handleSubmitDebounced();
              }}
            />
            <Checkbox
              label="Compress with zlib"
              checked={withCompression()}
              onInput={(e) => {
                setWithCompression(e.currentTarget.checked);
                handleSubmitDebounced();
              }}
            />
          </div>
          <Textarea label="Output" value={output()} readOnly rows={12} letterCount={output().length} />
          <Show when={processingMs() === 0 || processingMs()}>
            <div class="text-end font-monospace">done in {processingMs()}ms</div>
          </Show>
        </form>
      </div>
    </>
  );
}
