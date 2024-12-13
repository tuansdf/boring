import { Header } from "@/components/layout/header.tsx";
import { A } from "@solidjs/router";

export default function IndexPage() {
  return (
    <>
      <Header title="Boring" />

      <div class="container-xxl p-3">
        <h1 class="fs-5 fw-semibold mb-2">Tools</h1>
        <ul class="d-flex flex-column gap-1">
          <li>
            <A href="/base64-encode">Base64 Encode</A>
          </li>
          <li>
            <A href="/base64-decode">Base64 Decode</A>
          </li>
          <li>
            <A href="/compress-image">Image Compressor</A>
          </li>
          <li>
            <A href="/lorem">Lorem Generator</A>
          </li>
          <li>
            <A href="/mock-data">Mock Data Generator</A>
          </li>
          <li>
            <A href="/qr-code-generator">QR Code Generator</A>
          </li>
        </ul>
      </div>
    </>
  );
}
