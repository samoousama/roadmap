// TODO: delete it
// import { StylesConfig, ThemeConfig } from "react-select";

// // USAGE:

// //  <Select
// //           name="tags"
// //           id="tags"
// //           options={TAGS}
// //           isMulti
// //           closeMenuOnSelect={false}
// //           placeholder="Select all tags that apply"
// //           defaultValue={getTagsByValues(job?.tags)}
// //           {...getSelectStyles(3)}
// //         />

// const primary = "#f0abfc";
// const primary25 = "#fae8ff";

// export const getStyles: (zIndex: number) => StylesConfig = (
//   zIndex: number,
// ) => ({
//   control: (styles, state) => ({
//     ...styles,
//     boxShadow:
//       state.isFocused || state.menuIsOpen
//         ? `var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) ${primary25}`
//         : "none",
//     padding: "0.25rem 0.25rem",
//     borderColor: state.isFocused || state.menuIsOpen ? primary : "#d1d5db",
//     "&:hover": {
//       borderColor: primary,
//     },
//   }),
//   placeholder: (styles) => ({ ...styles, color: "#9ca3af" }),
//   container: (styles) => ({ ...styles, zIndex }),
// });

// export const theme: ThemeConfig = (theme) => ({
//   ...theme,
//   borderRadius: 6,
//   colors: {
//     ...theme.colors,
//     primary25,
//     primary50: "#f5d0fe",
//     primary75: "#e879f9",
//     primary,
//   },
// });

// export function getSelectStyles(zIndex: number) {
//   return {
//     styles: getStyles(zIndex),
//     theme,
//   };
// }

// export const getRadioValues = (radioNodeList: RadioNodeList): string[] => {
//   let values: string[] = [];
//   for (let i = 0; i < radioNodeList.length; i++) {
//     const radioInput = radioNodeList[i];
//     if (radioInput instanceof HTMLInputElement) {
//       if (radioInput.value) values.push(radioInput.value);
//     } else {
//       throw new Error("Unknow Node. Expected 'HTMLInputElement'");
//     }
//   }
//   return values;
// };

// const tags = getRadioValues(els.namedItem("tags") as RadioNodeList);
