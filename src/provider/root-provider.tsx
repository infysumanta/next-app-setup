import React from "react";
import { ThemeProvider } from "./_theme-provider";

type Props = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default RootProvider;
