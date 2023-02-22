import React from "react";
import { sundayQueryClient } from "@sunday/core/utils/client";
import { QueryClientProvider } from "react-query";

export const SundayProvider: React.FunctionComponent<{
  withTheme: boolean,
}> = ({ children, withTheme = false }) => {
  return (
    <QueryClientProvider client={sundayQueryClient}>
      {children}
    </QueryClientProvider>
  );
};