//@flow

export const loadingStart = () => {
  return {
    type: "LOADING_START"
  };
};

export const loadingFinished = () => {
  return {
    type: "LOADING_FINISHED"
  };
};
