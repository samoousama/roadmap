"use client";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { type Company, Job, User } from "@prisma/client";
import Link from "next/link";
import {
  PRIMARY_ROLES,
  SALARY_MIN,
  SALARY_MAX,
  EMPLOYMENT_TYPE,
  TAGS,
  BENEFITS,
  LOCATIONS,
  getTagsByValues,
  getLocationsByValues,
  getBenefitsByValues,
  Item,
  COMPANY_PLACEHOLDER,
  QuillModules,
} from "@/utils/const";
import { getAutocompleteProps } from "@/app/styles/misc";
import { useRouter } from "next/navigation";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { generateFilePath, getFileUrl, uploadFileBlob } from "@/db/supabase";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill-styles.css";
import "./NewJobForm.css";
import { ACCEPT_IMGS, compressImage } from "@/utils/images";

const tagsFilter = createFilterOptions<Item>({
  trim: true,
});

const CREATE_PREFIX = "__CREATE_NEW__";

export default function NewJobForm({
  company,
  job,
  user,
}: {
  company: Company;
  job?: Job;
  user: User;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState<Item[]>(getTagsByValues(job?.tags));
  const [locations, setLocations] = useState<Item[]>(
    getLocationsByValues(job?.locations),
  );
  const [benefits, setBenefits] = useState<Item[]>(
    getBenefitsByValues(job?.benefits),
  );

  const jobDescrRef = useRef<ReactQuill>(null);

  const selectFileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [imgBlobUrl, setImgBlobUrl] = useState<string | undefined>(undefined);

  // for debug
  const showDebug = window.location.href?.indexOf("http://localhost:3000") >= 0;

  const imgSrc =
    imgBlobUrl ?? job?.companyLogo ?? company.logoUrl ?? COMPANY_PLACEHOLDER;

  const onSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const els = event.currentTarget.elements;

    const position = (
      els.namedItem("position") as HTMLInputElement
    ).value?.trim();
    const primaryRole = (els.namedItem("primaryRole") as HTMLSelectElement)
      .value;
    const salaryMin = parseInt(
      (els.namedItem("salaryMin") as HTMLSelectElement).value,
    );
    const salaryMax = parseInt(
      (els.namedItem("salaryMax") as HTMLSelectElement).value,
    );
    const employmentType = (
      els.namedItem("employmentType") as HTMLSelectElement
    ).value;
    // const jobDescription = (
    // //   els.namedItem("jobDescription") as HTMLInputElement
    // ).value?.trim();

    // see - https://github.com/quilljs/quill/issues/903
    const jobDescription = jobDescrRef.current?.getEditor().root.innerHTML;

    const applyUrlOrEmail = (
      els.namedItem("applyUrlOrEmail") as HTMLInputElement
    ).value?.trim();
    const howToApply = (
      els.namedItem("howToApply") as HTMLInputElement
    ).value?.trim();

    const companyName = (
      els.namedItem("companyName") as HTMLInputElement
    ).value?.trim();
    const companyHQ = (
      els.namedItem("companyHQ") as HTMLInputElement
    ).value?.trim();
    const companyEmail = (
      els.namedItem("companyEmail") as HTMLInputElement
    ).value?.trim();
    const companyWebsite = (
      els.namedItem("companyWebsite") as HTMLInputElement
    ).value?.trim();
    const companyLinkedIn = (
      els.namedItem("companyLinkedIn") as HTMLInputElement
    ).value?.trim();
    const companyDescription = (
      els.namedItem("companyDescription") as HTMLInputElement
    ).value?.trim();

    const filePath = imgBlobUrl
      ? generateFilePath(fileName, user.id)
      : undefined;
    const companyLogo =
      getFileUrl(filePath) ?? job?.companyLogo ?? company.logoUrl ?? null;

    setIsLoading(true);

    const data = {
      jobId: job?.id ?? undefined,
      position,
      primaryRole,
      salaryMin,
      salaryMax,
      tags: tags.map((t) => t.value),
      locations: locations.map((l) => l.value),
      employmentType,
      jobDescription,
      benefits: benefits.map((b) => b.value),
      applyUrlOrEmail,
      howToApply,
      companyName,
      companyHQ,
      companyEmail,
      companyWebsite,
      companyLinkedIn,
      companyDescription,
      companyLogo,
    };

    // console.log("data before request: ", data);

    if (filePath && imgBlobUrl) {
      uploadFileBlob(imgBlobUrl, filePath).then(() => {
        setFileName(undefined);
        if (imgBlobUrl) {
          URL.revokeObjectURL(imgBlobUrl);
        }
        setImgBlobUrl(undefined);
        if (selectFileRef.current) {
          selectFileRef.current.value = "";
        }
      });
    }

    await fetch("/api/job", {
      method: job ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const json = await response.json();
        return { response, json };
      })
      .then(({ response, json }) => {
        if (!response.ok) {
          throw new Error(json?.message ?? JSON.stringify(json));
        }
        toast.success(job ? "Job updated" : "Job created");
        // console.log(json);
        router.refresh();
        router.replace(`/jobs/edit/${json.slug}`);
      })
      .catch((e) => {
        toast.error(
          "Oops, could not complete the request. Please, try again 🙏",
        );
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form onSubmit={onSave} className="flex flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full">
          <label htmlFor="position" className="my-label">
            Position (job title)
          </label>
          <input
            id="position"
            name="position"
            placeholder="Ex. Senior Data Engineer"
            className="my-input w-full"
            type="text"
            required
            defaultValue={
              job?.position ?? (showDebug ? "Senior Data Engineer" : undefined)
            }
          />
        </div>
        <div className="w-full">
          <label htmlFor="primaryRole" className="my-label">
            Primary role
          </label>
          <select
            id="primaryRole"
            name="primaryRole"
            className="my-input w-full"
            required
            defaultValue={
              job?.primaryRole ?? (showDebug ? PRIMARY_ROLES[0].value : "")
            }
          >
            <option value="" disabled>
              Select primary role
            </option>
            {PRIMARY_ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full">
          <label htmlFor="salaryMin" className="my-label">
            Salary min
          </label>
          <select
            id="salaryMin"
            name="salaryMin"
            className="my-input w-full"
            required
            defaultValue={
              job?.salaryMin ?? (showDebug ? SALARY_MIN[0].value : "")
            }
          >
            <option value="" disabled>
              Select min annual salary
            </option>
            {SALARY_MIN.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="salaryMax" className="my-label">
            Salary max
          </label>
          <select
            id="salaryMax"
            name="salaryMax"
            className="my-input w-full"
            required
            defaultValue={
              job?.salaryMax ?? (showDebug ? SALARY_MAX[0].value : "")
            }
          >
            <option value="" disabled>
              Select max annual salary
            </option>
            {SALARY_MAX.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="-mt-3.5 text-sm text-placeholder sm:-mt-5">
        Annual salary / compensation in USD. If it&apos;s a short-term project
        work, specify annualized equivalent.
      </p>

      <div className="w-full">
        <label htmlFor="locations" className="my-label">
          Location(s) this job is restricted to
        </label>
        <Autocomplete
          id="locations"
          options={LOCATIONS}
          multiple
          filterSelectedOptions
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select locations from which you hire for this role"
            />
          )}
          value={locations}
          onChange={(_, value) => {
            setLocations(value);
          }}
          {...getAutocompleteProps()}
        />
      </div>

      <div className="w-full">
        <label htmlFor="tags" className="my-label">
          Tags, skills or keywords
        </label>
        <Autocomplete
          id="tags"
          options={TAGS}
          multiple
          filterSelectedOptions
          filterOptions={(options, state) => {
            const filtered = tagsFilter(options, state);
            const inputVal = state?.inputValue?.trim() || "";
            const inputValLower = inputVal.toLowerCase();
            const alreadyExist =
              options.some((o) => inputValLower === o.label.toLowerCase()) ||
              tags.some((t) => inputValLower === t.label.toLowerCase());
            if (!alreadyExist && inputVal && filtered.length === 0) {
              // add if not empty and doesn't exist
              filtered.push({
                value: `${CREATE_PREFIX}${inputVal}`,
                label: `Add '${inputVal}'`,
              });
            }
            return filtered;
          }}
          disableCloseOnSelect
          freeSolo
          renderInput={(params) => (
            <TextField {...params} placeholder="Select all tags that apply" />
          )}
          value={tags}
          onChange={(_, value, reason) => {
            const safeValues = value.filter(
              (v) => typeof v !== "string",
            ) as Item[];
            const mappedValues = safeValues.map((v) => {
              if (v.value.indexOf(CREATE_PREFIX) < 0) return v;
              const newValue = v.value.replace(CREATE_PREFIX, "");
              return {
                value: newValue,
                label: newValue,
              };
            });
            if (reason === "createOption") {
              const newCreateOption = (
                (value.find((v) => typeof v === "string") as string) || ""
              ).trim();
              const newCreaetOptionLower = newCreateOption.toLowerCase();
              const alreadyExist =
                mappedValues.some(
                  (o) => newCreaetOptionLower === o.value.toLowerCase(),
                ) ||
                tags.some(
                  (t) => newCreaetOptionLower === t.value.toLowerCase(),
                );
              if (!alreadyExist && newCreateOption) {
                mappedValues.push({
                  value: newCreateOption,
                  label: newCreateOption,
                });
              }
            }
            setTags(mappedValues);
          }}
          {...getAutocompleteProps()}
        />
      </div>

      <div className="w-full">
        <label htmlFor="employmentType" className="my-label">
          Employment type
        </label>
        <select
          id="employmentType"
          name="employmentType"
          className="my-input w-full"
          required
          defaultValue={
            job?.employmentType ?? (showDebug ? EMPLOYMENT_TYPE[0].value : "")
          }
        >
          <option value="" disabled>
            Select employment type
          </option>
          {EMPLOYMENT_TYPE.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>

      <div className="my-quill-container w-full">
        <label htmlFor="jobDescription" className="my-label">
          Job description
        </label>

        <ReactQuill
          modules={QuillModules}
          ref={jobDescrRef}
          id="jobDescription"
          className="min-h-[64px] w-full rounded-md"
          defaultValue={
            job?.jobDescription ?? (showDebug ? "Some description" : undefined)
          }
          placeholder="Requirements, responsibilities, what offers on this role"
        />
      </div>

      <div className="w-full">
        <label htmlFor="benefits" className="my-label">
          Benefits
        </label>
        <Autocomplete
          id="benefits"
          options={BENEFITS}
          multiple
          filterSelectedOptions
          disableCloseOnSelect
          renderInput={(params) => (
            <TextField {...params} placeholder="Select benefits you provide" />
          )}
          value={benefits}
          onChange={(_, value) => {
            setBenefits(value);
          }}
          {...getAutocompleteProps()}
        />
      </div>

      <div className="w-full">
        <label htmlFor="applyUrlOrEmail" className="my-label">
          Apply link or email
        </label>
        <input
          id="applyUrlOrEmail"
          name="applyUrlOrEmail"
          placeholder="Ex: https://jobs.company.com/position-id or talent@company.com"
          className="my-input w-full"
          type="text"
          defaultValue={
            job?.applyUrlOrEmail ?? (showDebug ? "some@email.com" : undefined)
          }
        />
      </div>

      <div className="w-full">
        <label htmlFor="howToApply" className="my-label">
          How to apply
        </label>
        <textarea
          id="howToApply"
          name="howToApply"
          placeholder="Instructions / requiremetns how to apply to the job (portfolio, resume, cover letter, etc.)"
          className="my-input min-h-16 w-full resize-y"
          rows={4}
          defaultValue={
            job?.howToApply ?? (showDebug ? "Some instructions" : undefined)
          }
        />
      </div>

      <div className="h-[1px] bg-divider"></div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg">About company</h3>
        <Link href="/company" className="my-btn-text text-sm font-normal">
          Update company details
        </Link>
      </div>

      <div className="w-full">
        <label htmlFor="companyLogo" className="my-label">
          Company logo
        </label>
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
            onClick={(e) => {
              e.preventDefault();
              selectFileRef.current?.click();
            }}
          >
            Select image
          </button>
          {fileName ? (
            <span className="line-clamp-1 text-base">{fileName}</span>
          ) : null}
          <input
            type="file"
            id="companyLogo"
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
                compressImage(newFile).then((newUrl) => {
                  setImgBlobUrl(newUrl);
                });
              } else {
                setImgBlobUrl(undefined);
              }
            }}
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
            placeholder="Ex. Acme"
            className="my-input w-full"
            type="text"
            required
            defaultValue={job?.companyName ?? company.name ?? undefined}
          />
        </div>
        <div className="w-full">
          <label htmlFor="companyHQ" className="my-label">
            HQ location
          </label>
          <input
            id="companyHQ"
            name="companyHQ"
            placeholder="Ex. London"
            className="my-input w-full"
            type="text"
            required
            defaultValue={job?.companyHQ ?? company.location ?? undefined}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="w-full">
          <label htmlFor="companyEmail" className="my-label">
            Company email (stays private)
          </label>
          <input
            id="companyEmail"
            name="companyEmail"
            placeholder="Ex. talent@company.com"
            className="my-input w-full"
            type="email"
            required
            defaultValue={job?.companyEmail ?? company.email ?? undefined}
          />
        </div>
        <div className="w-full">
          <label htmlFor="companyWebsite" className="my-label">
            Company website
          </label>
          <input
            id="companyWebsite"
            name="companyWebsite"
            placeholder="https://www.acme.com"
            className="my-input w-full"
            type="text"
            required
            defaultValue={job?.companyWebsite ?? company.website ?? undefined}
          />
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="companyLinkedIn" className="my-label">
          Company LinkedIn Url
        </label>
        <input
          id="companyLinkedIn"
          name="companyLinkedIn"
          placeholder="https://linkedin.com/company/..."
          className="my-input w-full"
          type="text"
          defaultValue={
            job?.companyLinkedIn ?? company.linkedInUrl ?? undefined
          }
        />
      </div>

      <div className="w-full">
        <label htmlFor="companyDescription" className="my-label">
          Description
        </label>
        <textarea
          id="companyDescription"
          name="companyDescription"
          placeholder="Write a few words about your company..."
          className="my-input min-h-16 w-full resize-y"
          rows={4}
          defaultValue={
            job?.companyDescription ?? company.description ?? undefined
          }
        />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="my-btn" disabled={isLoading}>
          {isLoading
            ? job
              ? "Saving..."
              : "Creating..."
            : job
            ? "Save job"
            : "Create job"}
        </button>
      </div>
    </form>
  );
}
