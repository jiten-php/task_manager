import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const clintid = import.meta.env.VITE_CLINT_ID;
const quaryClint = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clintid}>
    <QueryClientProvider client={quaryClint}>
      <App />
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
