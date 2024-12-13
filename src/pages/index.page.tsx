import { Header } from "@/components/layout/header.tsx";
import { Alert } from "@/components/ui/alert.tsx";
import { cn } from "@/utils/classnames.ts";
import { A } from "@solidjs/router";
import classes from "./index.page.module.scss";

export default function IndexPage() {
  return (
    <>
      <Header title="Boring" />

      <div class="container-xxl p-3">
        <h1 class="fs-5 fw-semibold mb-3">Tools</h1>
        <ul class="list-unstyled">
          <ListItem href="/base64-encode" text="Base64 Encode" />
          <ListItem href="/base64-decode" text="Base64 Decode" />
          <ListItem href="/compress-image" text="Image Compressor" />
          <ListItem href="/lorem" text="Lorem Generator" />
          <ListItem href="/mock-data" text="Mock Data Generator" />
          <ListItem href="/qr-code-generator" text="QR Code Generator" />
        </ul>
      </div>
    </>
  );
}

type ListItemProps = {
  href: string;
  text: string;
};
const ListItem = (props: ListItemProps) => {
  return (
    <li>
      <A href={props.href} class={cn("text-white text-decoration-none fw-semibold", classes["item"])}>
        <Alert variant="dark" class="mb-2">
          {props.text}
        </Alert>
      </A>
    </li>
  );
};
