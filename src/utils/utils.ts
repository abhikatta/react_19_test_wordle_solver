// get two array of alphabets :
// ex: ["d", "g", "", "", "e"];
// ex: ["", "", "h", "", ""];
// get a string can be any number under 26-length(!empty values in above arrays):
// ex: "djgeesnvid";

// algo:

// in all the words in the list:

// 1.check which words dont have the string values and filter ✅

// 2. check which words have the yellow values and filter ✅

// 3. check which words have the green values at their positions ✅

import { InitialInputState } from "../redux/types";

export const Submit = (
  defaultWords: string[],
  gray_letters: string,
  green_letters: InitialInputState["green_letters"],
  yellow_letters: InitialInputState["yellow_letters"]
): string[] => {
  let filteredWords: string[] = defaultWords;
  // gray words filteration:
  const grayLetters = gray_letters.length > 0 ? gray_letters.split("") : [];
  if (grayLetters.length > 0) {
    filteredWords = filteredWords.filter((word) => {
      return !grayLetters.some((letter) => word.includes(letter));
    });
  }
  // yellowwords filteration:
  const yellowLetters = yellow_letters.length > 0 ? yellow_letters : [];
  const isYellowNotNull = yellowLetters.some((item) => item.value !== "");
  if (isYellowNotNull) {
    filteredWords = filteredWords.filter((word) => {
      return yellowLetters.every((letter) => word.includes(letter.value));
    });
  }

  // green words filteration:
  const greenLetters = green_letters.length > 0 ? green_letters : [];
  const isGreenNotNull = greenLetters.some((item) => item.value === "");
  if (!isGreenNotNull) {
    filteredWords = filteredWords.filter((word) => {
      return greenLetters.every(
        (letter) => word[letter.position - 1] === letter.value
      );
    });
  }
  return filteredWords;
};
