"use client";
import { useState } from "react";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  if (!user) {
    return null;
  }
  const onSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;
    const firstName = (
      els.namedItem("firstName") as HTMLInputElement
    ).value?.trim();
    const lastName = (
      els.namedItem("lastName") as HTMLInputElement
    ).value?.trim();
    const companyName = (
      els.namedItem("companyName") as HTMLInputElement
    ).value?.trim();
    const jobTitle = (
      els.namedItem("jobTitle") as HTMLInputElement
    ).value?.trim();
    const linkedInUrl = (
      els.namedItem("linkedInUrl") as HTMLInputElement
    ).value?.trim();
    setIsLoading(true);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        companyName,
        jobTitle,
        linkedInUrl,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        router.refresh();
        toast.success("Profile updated !");
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={onSave} className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full">
          <label htmlFor="firstName" className="my-label">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            placeholder="Ex. Natalie "
            className="my-input w-full"
            type="text"
            required
            defaultValue={user.firstName || ""}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName" className="my-label">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Ex. Denata"
            className="my-input w-full"
            type="text"
            required
            defaultValue={user.lastName || ""}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full">
          <label htmlFor="companyName" className="my-label">
            Company name
          </label>
          <input
            id="companyName"
            name="companyName"
            placeholder="Ex. Google"
            className="my-input w-full"
            type="text"
            defaultValue={user.companyName || ""}
          />
        </div>
        <div className="w-full">
          <label htmlFor="jobTitle" className="my-label">
            Job title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            placeholder="Ex. Software Engineer"
            className="my-input w-full"
            type="text"
            defaultValue={user.jobTitle || ""}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="linkedInUrl" className="my-label">
          LinkedIn Url
        </label>
        <input
          id="linkedInUrl"
          name="linkedInUrl"
          placeholder="https://www.linkedin.com/in/your-profile"
          className="my-input w-full"
          type="text"
          defaultValue={user.linkedInUrl || ""}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="my-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
