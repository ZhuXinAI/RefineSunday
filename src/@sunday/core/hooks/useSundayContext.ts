import React, { useContext } from "react";

export const SundayContext = React.createContext<{
  value: any;
  onChange: (data: any) => void;
  isReady: boolean
}>({
  value: {},
  onChange: () => {},
  isReady: false
});

export const useSundayContext = () => {
  return useContext(SundayContext);
};
