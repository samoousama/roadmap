// this solution was taken from - https://mui.com/material-ui/guides/next-js-app-router/
"use client";
import { useState } from "react";
import createCache, { Options } from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: "#c026d3",
      dark: "#a21caf",
      light: "$e879f9", // primary-400
    },
    error: {
      main: "#D92D20",
      dark: "#B42318",
    },
    secondary: {
      main: "##2E90FA", // Blue from Untitled UI
    },
  },
  typography: {
    fontFamily: ["var(--fixel-font)", '"Arial"', "sans-serif"].join(","),
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
  breakpoints: {
    // Tailwind breakpoints
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  shape: {
    borderRadius: 6, // Tailwind 'rounded-md'
  },
  // shadows: [
  //   ...Array(25).fill(
  //     "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
  //   ),
  // ] as Shadows,
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // Tailwind 'shadow-xl'
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
        },
      },
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       padding: "4px 9px !important",
    //       "& fieldset": {
    //         borderColor: "#d1d5db",
    //       },
    //       "&:hover fieldset": {
    //         borderColor: "#f0abfc !important",
    //       },
    //       "&.Mui-focused fieldset": {
    //         border: "1px solid #f0abfc !important",
    //         boxShadow: "var(--tw-ring-inset) 0 0 0 4px #fae8ff !important",
    //       },
    //     },
    //   },
    // },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "4px 9px",
            "& fieldset": {
              borderColor: "#d1d5db",
            },
            "&:hover fieldset": {
              borderColor: "#f0abfc",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #f0abfc",
              boxShadow: "var(--tw-ring-inset) 0 0 0 4px #fae8ff",
            },
          },
        },
      },
    },
  },
});

type Props = {
  children: React.ReactNode;
  options: Options;
};

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: Props) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
