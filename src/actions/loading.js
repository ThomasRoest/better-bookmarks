export const loadingStart = () => {
  console.log("loading start");
  return {
    type: "LOADING_START"
  };
};

export const loadingFinished = () => {
  console.log("loading finished");
  return {
    type: "LOADING_FINISHED"
  };
};
