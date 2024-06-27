import { key } from "../constants";
import { dataType } from "./types";

export const pressedSubmit = (): void => {
  const data: dataType = {
    time: new Date().getDay(),
    isSubmitted: true,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

export const resetSubmission = (): void => {
  const today = new Date().getDay();
  const yesterday: dataType["time"] | null =
    (JSON.parse(localStorage.getItem(key) as string) as dataType)?.time || null;
  if (yesterday && today - yesterday === 0) {
    return;
  } else {
    const newData: dataType = {
      isSubmitted: false,
      time: today,
    };
    localStorage.setItem(key, JSON.stringify(newData));
  }
};
