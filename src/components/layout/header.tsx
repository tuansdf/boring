import { A } from "@solidjs/router";

type Props = {
  title?: string;
};

export const Header = (props: Props) => {
  return (
    <header class="border-bottom">
      <div class="d-flex justify-content-between align-items-center container-xxl py-0" style={{ height: "3rem" }}>
        <A href="/" class="text-decoration-none text-light">
          <h1 class="fs-5 fw-semibold m-0">{props.title || "Boring"}</h1>
        </A>
      </div>
    </header>
  );
};
