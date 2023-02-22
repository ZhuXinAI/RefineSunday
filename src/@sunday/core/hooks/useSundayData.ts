import { useSundayContext } from "./useSundayContext";

export const useSundayData = () => {
  const { value, onChange, isReady } = useSundayContext();
  return {
    data: value,
    isFetched: isReady,
    updateData: onChange,
  };
};
