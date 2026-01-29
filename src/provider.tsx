import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";

import { persistor, store } from "./stores";
import Loading from "./components/Loading";
import i18n from "./utils/libs/i18n";
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            {children}
          </PersistGate>
        </StoreProvider>
      </I18nextProvider>
    </HeroUIProvider>
  );
}
