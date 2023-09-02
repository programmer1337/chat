import {useState} from "react";

export const useWaitingIndicator = () => {
  const [ready, setReady] = useState(false);

  const handleWaiting = (state) => {
    setReady(state);
  };

  return {
    ready,
    handleWaiting
  };
};
