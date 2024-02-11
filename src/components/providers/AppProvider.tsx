import { ReactNode } from "react";
import ConvexClientProvider from "./ConvexClientProvider";
import { ThemeProvider } from "./theme-provider";
import { ModalProvider } from "./modal-provider";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ModalProvider />
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ThemeProvider>
  );
};
export default AppProvider;
