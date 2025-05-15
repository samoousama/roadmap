"use client";

import { GA_MEASUREMENT_ID } from "@/utils/const";

export default function Noscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GA_MEASUREMENT_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      ></iframe>
    </noscript>
  );
}
