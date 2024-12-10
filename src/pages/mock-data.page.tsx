import { Header } from "@/components/layout/header.tsx";
import { ScreenLoading } from "@/components/ui/screen-loading.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { debounce } from "@/utils/common.util.ts";
import { generateMockDataJsonString } from "@/features/mock-data/mock-data.util.ts";
import { createSignal, Show } from "solid-js";

export default function MockDataPage() {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  const [input, setInput] = createSignal<string>("");
  const [output, setOutput] = createSignal<string>("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      if (!input()) return;
      const req = JSON.parse(input());
      const data = await generateMockDataJsonString(req);
      setOutput(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitDebounced = debounce(handleSubmit, 300);

  return (
    <>
      <Header title="Mock Data Generator" />

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
          />
          <Textarea label="Output" value={output()} readOnly rows={12} />
        </form>
      </div>

      <Show when={isLoading()}>
        <ScreenLoading />
      </Show>
    </>
  );
}
