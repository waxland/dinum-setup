import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import '@codegouvfr/react-dsfr/dsfr/dsfr.min.css';
import '@codegouvfr/react-dsfr/dsfr/utility/icons/icons.min.css';
import "./demo.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
