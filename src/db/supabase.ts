import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
);

export function generateFilePath(fileName: string | undefined, userId: string) {
  return (
    userId +
    "/" +
    Math.random().toString(36).substring(2) +
    "_" +
    (fileName ?? "")
  );
}

export function getFileUrl(filePath?: string) {
  if (!filePath) return undefined;
  // https://kngdbzozrvgozrcxpuvc.supabase.co/storage/v1/object/public/images/clnun94i3000avb2gvl1uafol/nfa768oqhm_logo.png?t=2023-10-29T17%3A53%3A24.973Z
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${filePath}`;
}

export async function uploadFile(file: File, filePath: string) {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  } else {
    // Handle success
    // console.log("data.path: ", data.path);
    return data.path;
  }
}

export async function uploadFileBlob(imgUrl: string, filePath: string) {
  const blob = await fetch(imgUrl).then((r) => r.blob());
  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, blob);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  } else {
    // Handle success
    // console.log("data.path: ", data.path);
    return data.path;
  }
}
