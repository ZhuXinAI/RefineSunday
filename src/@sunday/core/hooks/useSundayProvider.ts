import { useEffect, useState } from "react";

export const useSundayLocalStateProvider = () => {
  const [isReady, setIsReady] = useState(false);
  const [sundayData, setSundayData] = useState(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = JSON.parse(window.localStorage.getItem("sundayData")!);
      setSundayData(localData);
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !!sundayData) {
      window.localStorage.setItem("sundayData", JSON.stringify(sundayData));
    }
  }, [sundayData]);

  return {
    value: sundayData || {},
    onChange: (values: any) => {
      setSundayData({
        ...(sundayData || {}),
        ...values,
      });
    },
    isReady
  };
};
