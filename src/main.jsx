import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router";
import { myRouter } from "./Routing/AppRouter";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContextProvider/AuthContextProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Offline } from "react-detect-offline";
const data = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={data}>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={myRouter} />
             <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>
    <Offline>
    <div className="fixed top-[50%] p-2 bg-black text-white rounded-4xl z-100">  <h1>Check your internet connection</h1></div>
    </Offline>
  </StrictMode>,
);
