import { Header } from "@/components/layout/header.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { debounce } from "@/utils/common.util.ts";
import { generateJSONs } from "@/utils/mock.util.ts";
import { createSignal } from "solid-js";

export default function MockDataPage() {
  const [input, setInput] = createSignal<string>("");
  const [output, setOutput] = createSignal<string>("");

  const handleSubmit = async () => {
    try {
      if (!input()) return;
      const req = JSON.parse(input());
      const res = JSON.stringify(await generateJSONs(req), null, 2);
      setOutput(res);
    } catch {}
  };

  const handleSubmitDebounced = debounce(handleSubmit, 500);

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
    </>
  );
}
