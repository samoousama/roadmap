import { Item } from "@/utils/const";
import Chip from "@mui/material/Chip";
import { HTMLAttributes } from "react";

export function getAutocompleteProps<T = string>() {
  // to get rid of the error: https://stackoverflow.com/questions/75818761/material-ui-autocomplete-warning-a-props-object-containing-a-key-prop-is-be
  return {
    renderOption: (props: HTMLAttributes<HTMLLIElement>, option: Item<T>) => {
      // to handle freeSolo
      if (typeof option === "string") {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        );
      }
      return (
        <li {...props} key={String(option.value)}>
          {option.label}
        </li>
      );
    },
    renderTags: (tagValue: Item<T>[], getTagProps: any) => {
      return tagValue.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option.value}
          label={option.label}
        />
      ));
    },
  };
}
