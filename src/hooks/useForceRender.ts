import { useState, useCallback } from "react";

const useForceRender = () => {
  const [count, setCount] = useState(1);
  const forceRender = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);
  return [count, forceRender] as [number, () => void];
};

export default useForceRender;
