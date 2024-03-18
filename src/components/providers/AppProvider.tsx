import { ReactNode } from "react";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "./theme-provider";
import { ModalProvider } from "./modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ConvexClientProvider>
      <EdgeStoreProvider>
        <ModalProvider />
        {children}
      </EdgeStoreProvider>
    </ConvexClientProvider>
    // </ThemeProvider>
  );
};
export default AppProvider;
