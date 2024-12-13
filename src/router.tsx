import { Navigate, Router as ARouter } from "@solidjs/router";
import { lazy } from "solid-js";

const routes = [
  {
    path: "/",
    component: lazy(() => import("@/pages/index.page.tsx")),
  },
  {
    path: "/base64-encode",
    component: lazy(() => import("@/pages/base64-encode.page.tsx")),
  },
  {
    path: "/base64-decode",
    component: lazy(() => import("@/pages/base64-decode.page.tsx")),
  },
  {
    path: "/compress-image",
    component: lazy(() => import("@/pages/compress-image.page.tsx")),
  },
  {
    path: "/mock-data",
    component: lazy(() => import("@/pages/mock-data.page.tsx")),
  },
  {
    path: "/lorem",
    component: lazy(() => import("@/pages/lorem.page.tsx")),
  },
  {
    path: "/qr-code-generator",
    component: lazy(() => import("@/pages/qr-code-generator.page.tsx")),
  },
  {
    path: "/*",
    component: () => <Navigate href="/" />,
  },
];

export const Router = () => {
  return <ARouter>{routes}</ARouter>;
};
