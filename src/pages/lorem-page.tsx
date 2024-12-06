import { Header } from "@/components/layout/header.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { debounce } from "@/utils/common.util.ts";
import { generateLorem } from "@/utils/lorem.util.ts";
import { createSignal, Show } from "solid-js";

export default function LoremPage() {
  const [output, setOutput] = createSignal<string>("");
  const [wordCount, setWordCount] = createSignal<number>(3);
  const [processingTime, setProcessingTime] = createSignal<number | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 100));
    const start = performance.now();
    setOutput(await generateLorem(wordCount()));
    setProcessingTime(performance.now() - start);
    setIsLoading(false);
  };

  const handleSubmitDebounced = debounce(handleSubmit);

  handleSubmit();

  return (
    <>
      <Header title="Lorem Ipsum Generator" />

      <div class="container-xxl p-3">
        <div class="row row-cols-sm-2 row-cols-lg-3">
          <Input
            label="Word count"
            type="number"
            min={1}
            max={1_000_000}
            value={wordCount()}
            onInput={(e) => {
              setWordCount(Number(e.currentTarget.value));
              handleSubmitDebounced();
            }}
            containerClass="mb-3 col"
          />
        </div>

        <Textarea label="Output" value={output()} readOnly rows={12} letterCount={output().length} />

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
