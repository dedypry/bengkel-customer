import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./stores";
import Loading from "./components/Loading";
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <StoreProvider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          {children}
        </PersistGate>
      </StoreProvider>
    </HeroUIProvider>
  );
}
