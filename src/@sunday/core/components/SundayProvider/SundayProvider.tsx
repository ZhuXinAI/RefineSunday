import React from "react";
import { SundayContext } from "@sunday/core/hooks/useSundayContext";

export const SundayProvider: React.FunctionComponent<{
  withTheme?: boolean,
  provider: any,
  children: any,
}> = ({ children, withTheme = false, provider }) => {
  return (
    <SundayContext.Provider value={provider}>
      {children}
    </SundayContext.Provider>
  );
};
