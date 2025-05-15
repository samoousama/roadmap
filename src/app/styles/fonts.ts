// on fonts - https://blog.logrocket.com/next-js-font-optimization-custom-google-fonts/
//Inter({ subsets: ["latin"], variable: "--inter-font" });

import localFont from "next/font/local";

export const fixel = localFont({
  src: "./FixelVariable.ttf",
  variable: "--fixel-font",
});
