import { key } from "../constants";
const Attempted = () => {
  const useHasTried = JSON.parse(
    localStorage.getItem(key) as string
  ) as boolean;
  const setTried = () => {
    const hasTried =
      (JSON.parse(localStorage.getItem(key) as string) as boolean) || false;

    hasTried === false &&
      localStorage.setItem(key as string, JSON.stringify(true));
  };

  return { useHasTried, setTried };
  // return { ,setTried };
};

export default Attempted;
