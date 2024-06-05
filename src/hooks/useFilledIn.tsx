// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { useEffect } from "react";

// const useFilledIn = () => {
//   const { gray_letters, green_letters, yellow_letters } = useSelector(
//     (state: RootState) => state.inputs
//   );

//   const emptyInputs = {
//     isYellowInputsEmpty: true,
//     isGreenInputsEmpty: true,
//     isGrayInputsEmpty: true,
//   };

//   useEffect(() => {
//     emptyInputs.isYellowInputsEmpty = yellow_letters.some(
//       (item) => item.value !== ""
//     );
//     emptyInputs.isGreenInputsEmpty = green_letters.some(
//       (item) => item.value !== ""
//     );
//     emptyInputs.isGrayInputsEmpty = gray_letters.length > 0;
//   }, [gray_letters.length, green_letters, yellow_letters]);
//   return { emptyInputs };
// };

// export default useFilledIn;
