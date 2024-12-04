import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/app.css";
import UserProvider from "./contexts/UserContext.jsx";
import ConvProvider from "./contexts/ConvContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConvProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ConvProvider>
  </StrictMode>
);
