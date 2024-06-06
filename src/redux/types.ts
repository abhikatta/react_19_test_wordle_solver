export type LetterType = "gray" | "yellow" | "green";
export interface InitialState {
  existsInArray: {
    gray: boolean;
    yellow: boolean;
  };
  gray_letters: string;
  green_letters: [
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    }
  ];
  yellow_letters: [
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    },
    {
      value: string;
      position: number;
    }
  ];
}

export interface InputPayloadType {
  value: string;
  position: number;
  type: LetterType;
}

export interface InitialWordsState {
  words: string[];
  fetchingData: boolean;
  grayFilteredWords: string[];
  yellowFilteredWords: string[];
  greenFilteredWords: string[];
  allWords: string[];
}
