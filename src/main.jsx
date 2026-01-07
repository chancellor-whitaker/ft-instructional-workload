// Register all Community features
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { createRoot } from "react-dom/client";

import "./index.css";
import { StrictMode } from "react";

import { RemoteComponent } from "./RemoteComponent.jsx";
import App from "./App.jsx";
ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RemoteComponent
      url="https://irserver2.eku.edu/libraries/remote/wrapper.cjs"
      heading="Fulltime Instructional Workload"
    >
      <App></App>
    </RemoteComponent>
  </StrictMode>
);
