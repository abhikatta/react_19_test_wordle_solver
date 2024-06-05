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
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    }
  ];
  yellow_letters: [
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    },
    {
      value: string;
      postion: number;
    }
  ];
}

export interface PayloadType {
  value: string;
  position: number;
  type: LetterType;
}
