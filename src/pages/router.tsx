import Base64EncodePage from "@/pages/base64-encode-page.tsx";
import { Navigate, Router as ARouter } from "@solidjs/router";

const routes = [
  {
    path: "/base64/encode",
    component: Base64EncodePage,
  },
  {
    path: "/*",
    component: () => <Navigate href="/" />,
  },
];

export const Router = () => {
  return <ARouter>{routes}</ARouter>;
};
