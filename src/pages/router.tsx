import Base64DecodePage from "@/pages/base64-decode-page.tsx";
import Base64EncodePage from "@/pages/base64-encode-page.tsx";
import ImageCompressorPage from "@/pages/image-compressor-page.tsx";
import { Navigate, Router as ARouter } from "@solidjs/router";

const routes = [
  {
    path: "/base64-encode",
    component: Base64EncodePage,
  },
  {
    path: "/base64-decode",
    component: Base64DecodePage,
  },
  {
    path: "/image-compressor",
    component: ImageCompressorPage,
  },
  {
    path: "/*",
    component: () => <Navigate href="/" />,
  },
];

export const Router = () => {
  return <ARouter>{routes}</ARouter>;
};
