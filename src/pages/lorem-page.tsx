import { Header } from "@/components/layout/header.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { debounce } from "@/utils/common.util.ts";
import { generateLorem } from "@/utils/lorem.util.ts";
import { createSignal, Show } from "solid-js";

export default function LoremPage() {
  const [output, setOutput] = createSignal<string>("");
  const [wordCount, setWordCount] = createSignal<number>(0);
  const [processingTime, setProcessingTime] = createSignal<number | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 100));
    const start = performance.now();
    let count = wordCount();
    setOutput(await generateLorem(count));
    setProcessingTime(performance.now() - start);
    setIsLoading(false);
  };

  const handleWordCountChange = (count: number) => {
    if (!count || count < 1) count = 1;
    if (count > 1_000_000) count = 1_000_000;
    setWordCount(() => count);
  };

  const handleSubmitDebounced = debounce(handleSubmit);

  return (
    <>
      <Header title="Lorem Ipsum Generator" />

      <form
        class="container-xxl p-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitDebounced();
        }}
      >
        <div class="row row-cols-sm-2 row-cols-lg-3">
          <Input
            label="Word count"
            type="number"
            min={1}
            max={1_000_000}
            value={wordCount()}
            onInput={(e) => setWordCount(Number(e.currentTarget.value))}
            onChange={(e) => handleWordCountChange(Number(e.currentTarget.value))}
            containerClass="mb-3 col"
          />
        </div>

        <Textarea label="Output" value={output()} readOnly rows={12} letterCount={output().length} />

        <Button type="submit">Generate</Button>

        <Show when={processingTime() === 0 || processingTime()}>
          <div class="text-end font-monospace mt-3">done in {processingTime()}ms</div>
        </Show>
      </form>

      <Show when={isLoading()}>
        <ScreenLoading />
      </Show>
    </>
  );
}
