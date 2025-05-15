"use client";
import { useRef, useState, useTransition } from "react";
import { User, Company } from "@prisma/client";
import toast from "react-hot-toast";
import { updateCompany } from "@/db/actions";
import {
  generateFilePath,
  getFileUrl,
  uploadFile,
  uploadFileBlob,
} from "@/db/supabase";
import { COMPANY_PLACEHOLDER } from "@/utils/const";
import { ACCEPT_IMGS, compressImage } from "@/utils/images";

export default function CompanyForm({
  company,
  user,
}: {
  company: Company;
  user: User;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [imgBlobUrl, setImgBlobUrl] = useState<string | undefined>(undefined);

  const imgSrc = imgBlobUrl ?? company.logoUrl ?? COMPANY_PLACEHOLDER;

  const onSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;
    const name = (els.namedItem("name") as HTMLInputElement).value?.trim();
    const location = (
      els.namedItem("location") as HTMLInputElement
    ).value?.trim();
    const email = (els.namedItem("email") as HTMLInputElement).value?.trim();
    const website = (
      els.namedItem("website") as HTMLInputElement
    ).value?.trim();
    const linkedInUrl = (
      els.namedItem("linkedInUrl") as HTMLInputElement
    ).value?.trim();
    const description = (
      els.namedItem("description") as HTMLInputElement
    ).value?.trim();
    setIsLoading(true);
    startTransition(() => {
      const filePath = imgBlobUrl
        ? generateFilePath(fileName, user.id)
        : undefined;
      const promises: Promise<any>[] = [
        updateCompany(
          company.id,
          name,
          location,
          email,
          website,
          linkedInUrl,
          description,
          getFileUrl(filePath),
        ),
      ];
      if (imgBlobUrl && filePath) {
        promises.push(uploadFileBlob(imgBlobUrl, filePath));
      }
      Promise.all(promises)
        .then(() => {
          if (imgBlobUrl) {
            URL.revokeObjectURL(imgBlobUrl);
            setImgBlobUrl(undefined);
            setFileName(undefined);
            if (selectFileRef.current) {
              selectFileRef.current.value = "";
            }
          }
          toast.success("Company updated");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Oops, could not update company");
        })
        .finally(() => setIsLoading(false));
    });
    // const res = await fetch("/api/company", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     location,
    //     email,
    //     website,
    //     linkedInUrl,
    //     description,
    //   }),
    // })
    //   .then((r) => r.json())
    //   .then((res) => {
    //     toast("Company updated", { type: "success" });
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     toast(e.message, { type: "error" });
    //   })
    //   .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-md bg-white px-4 py-6 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt="Company logo"
          className="aspect-square h-20 w-20 rounded-full bg-white object-contain ring-1 ring-gray-300"
        />
        <button
          type="button"
          className="my-btn-outline min-w-fit"
          onClick={() => selectFileRef.current?.click()}
        >
          Select image
        </button>
        {fileName ? (
          <span className="line-clamp-1 text-base">{fileName}</span>
        ) : null}
        <input
          type="file"
          ref={selectFileRef}
          accept={ACCEPT_IMGS}
          hidden
          onChange={(e) => {
            e.preventDefault();
            const newFile = e.target.files?.[0];
            setFileName(newFile?.name);
            if (imgBlobUrl) {
              // revoke old
              URL.revokeObjectURL(imgBlobUrl);
            }
            if (newFile) {
              compressImage(newFile).then((newUrl) => setImgBlobUrl(newUrl));
            } else {
              setImgBlobUrl(undefined);
            }
          }}
        />
      </div>
      <form onSubmit={onSave} className="flex flex-col gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="w-full">
            <label htmlFor="name" className="my-label">
              Company name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Ex. Acme"
              className="my-input w-full"
              type="text"
              required
              defaultValue={company.name || ""}
            />
          </div>
          <div className="w-full">
            <label htmlFor="location" className="my-label">
              HQ location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Ex. London"
              className="my-input w-full"
              type="text"
              required
              defaultValue={company.location || ""}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="w-full">
            <label htmlFor="email" className="my-label">
              Company email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Ex. talent@company.com"
              className="my-input w-full"
              type="email"
              required
              defaultValue={company.email || ""}
            />
          </div>
          <div className="w-full">
            <label htmlFor="website" className="my-label">
              Company website
            </label>
            <input
              id="website"
              name="website"
              placeholder="https://www.acme.com"
              className="my-input w-full"
              type="text"
              required
              defaultValue={company.website || ""}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="linkedInUrl" className="my-label">
            Company LinkedIn Url
          </label>
          <input
            id="linkedInUrl"
            name="linkedInUrl"
            placeholder="https://linkedin.com/company/..."
            className="my-input w-full"
            type="text"
            defaultValue={company.linkedInUrl || ""}
          />
        </div>

        <div className="w-full">
          <label htmlFor="description" className="my-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Write a few words about your company..."
            className="my-input min-h-16 w-full resize-y"
            rows={4}
            defaultValue={company.description || ""}
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" className="my-btn" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
