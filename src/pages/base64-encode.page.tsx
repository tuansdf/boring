import { Header } from "@/components/layout/header.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { encodeBase64 } from "@/features/base64/base64.util.ts";
import { debounce } from "@/utils/common.util.ts";
import { createSignal, Show } from "solid-js";

export default function Base64EncodePage() {
  const [input, setInput] = createSignal<string>("");
  const [output, setOutput] = createSignal<string>("");
  const [withCompression, setWithCompression] = createSignal<boolean>(false);
  const [isUrlSafe, setIsUrlSafe] = createSignal<boolean>(false);
  const [processingTime, setProcessingTime] = createSignal<number | null>(null);

  const handleSubmit = () => {
    try {
      if (!input()) return setOutput("");
      const start = performance.now();
      setOutput(encodeBase64(input(), { url: isUrlSafe(), compression: withCompression() }));
      setProcessingTime(performance.now() - start);
    } catch {}
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
              label="Compress with zlib before encode"
              checked={withCompression()}
              onInput={(e) => {
                setWithCompression(e.currentTarget.checked);
                handleSubmitDebounced();
              }}
            />
          </div>
          <Textarea label="Output" value={output()} readOnly rows={12} letterCount={output().length} />
          <Show when={processingTime() === 0 || processingTime()}>
            <div class="text-end font-monospace">done in {processingTime()}ms</div>
          </Show>
        </form>
      </div>
    </>
  );
}
