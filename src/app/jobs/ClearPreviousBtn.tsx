"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ClearPreviousBtn() {
  const router = useRouter();
  const search = useSearchParams();
  return (
    <button
      className="my-btn-secondary mt-4 max-w-fit p-0"
      onClick={() => {
        router.back();
      }}
    >
      Try clearing last filter!
    </button>
  );
}
