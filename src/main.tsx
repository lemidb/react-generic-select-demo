import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {/* <SidebarProvider> */}
          <App />
        {/* </SidebarProvider> */}
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
