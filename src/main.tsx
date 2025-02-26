import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerLicense } from "@syncfusion/ej2-base";
// import "@syncfusion/ej2-base/styles/material.css";

registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGJWf1FpR2NbfU5yflBEallXVAciSV9jS3xSdkRgWXtad3dQRWNfVA=="
  // "ORg4AjUWIQA/Gnt2VVhhQlFac11JW3xNYVF2R2FJe1RzdF9DZkwgOX1dQl9hSXtTcEVhWndceXFdQmY="
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
