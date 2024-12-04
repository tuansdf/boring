import { Navigate, Router as ARouter } from "@solidjs/router";
import { lazy } from "solid-js";

const routes = [
  {
    path: "/base64-encode",
    component: lazy(() => import("@/pages/base64-encode-page.tsx")),
  },
  {
    path: "/base64-decode",
    component: lazy(() => import("@/pages/base64-decode-page.tsx")),
  },
  {
    path: "/image-compressor",
    component: lazy(() => import("@/pages/image-compressor-page.tsx")),
  },
  {
    path: "/mock-data",
    component: lazy(() => import("@/pages/mock-data-page.tsx")),
  },
  {
    path: "/*",
    component: () => <Navigate href="/" />,
  },
];

export const Router = () => {
  return <ARouter>{routes}</ARouter>;
};
