"use client";
import { Provider } from "react-redux";

import { store } from "@/lib/redux/store";
import { QueryProvider } from "./react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
    <QueryProvider>
    <Provider store={store}>{children}</Provider>
    </QueryProvider>
    </>
  );
}
