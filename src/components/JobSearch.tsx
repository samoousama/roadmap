"use client";

import { getAutocompleteProps } from "@/app/styles/misc";
import {
  BENEFITS,
  Item,
  LOCATIONS,
  PRIMARY_ROLES,
  SALARY_MIN,
  SortBy,
  Search,
  TAGS,
  getBenefitsByValues,
  getLocationsByValues,
  getRolesByValues,
  getTagsByValues,
  AllJobStatus,
} from "@/utils/const";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  locations: string[];
  roles: string[];
  tags: string[];
  benefits: string[];
  comp: number;
  sort: string;
  status?: string;
  isAdmin?: boolean;
};

const close = "\u2717"; // &#x00d7; &times;
const chipClass = "my-tag cursor-zoom-out hover:bg-gray-50";

export default function JobSearch({
  locations,
  roles,
  tags,
  benefits,
  sort,
  comp,
  status,
  isAdmin = false,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = new URLSearchParams(searchParams.toString());

  const chipsCount =
    locations.length +
    roles.length +
    tags.length +
    benefits.length +
    (comp ? 1 : 0);

  function toChips(list: Item<string | number>[], name: string) {
    return list.map((l) => (
      <span
        className={chipClass}
        key={l.value}
        onClick={() => {
          search.delete(name, String(l.value));
          router.push(`?${search.toString()}`, { scroll: false });
        }}
      >
        {l.label} {close}
      </span>
    ));
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {/* <input
        className="my-input mt-2 w-full max-w-lg"
        placeholder="Search Data Engineering jobs"
      ></input> */}
      <div className="mt-4 flex w-full flex-wrap gap-2">
        <Autocomplete
          className="min-w-[10rem] flex-1"
          id="locations-ac"
          options={LOCATIONS.filter((l) => locations.indexOf(l.value) < 0)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Locations" />
          )}
          value={null}
          onChange={(_, value) => {
            if (value) {
              search.append(Search.Location, value.value);
              router.push(`?${search.toString()}`, { scroll: false });
              // unfocus the input
              document.getElementById("locations-ac")?.blur();
            }
          }}
          {...getAutocompleteProps()}
        />
        <Autocomplete
          className="min-w-[10rem] flex-1"
          id="roles-ac"
          options={PRIMARY_ROLES.filter((r) => roles.indexOf(r.value) < 0)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Roles" />
          )}
          value={null}
          onChange={(_, value) => {
            if (value) {
              search.append(Search.Role, value.value);
              router.push(`?${search.toString()}`, { scroll: false });
              // unfocus the input
              document.getElementById("roles-ac")?.blur();
            }
          }}
          {...getAutocompleteProps()}
        />
        <Autocomplete
          className="min-w-[10rem] flex-1"
          id="comp-ac"
          options={SALARY_MIN}
          renderInput={(params) => (
            <TextField {...params} placeholder="Min salary / year" />
          )}
          value={null}
          onChange={(_, value) => {
            if (value) {
              search.set(Search.Compensation, String(value.value));
              router.push(`?${search.toString()}`, { scroll: false });
              // unfocus the input
              document.getElementById("comp-ac")?.blur();
            }
          }}
          {...getAutocompleteProps<number>()}
          // renderOption={(props, option) => (
          //   <li {...props} key={String(option.value)}>
          //     {option.label} / year
          //   </li>
          // )}
        />
        <Autocomplete
          className="min-w-[10rem] flex-1"
          id="tags-ac"
          options={TAGS.filter((r) => tags.indexOf(r.value) < 0)}
          renderInput={(params) => <TextField {...params} placeholder="Tags" />}
          value={null}
          onChange={(_, value) => {
            if (value) {
              search.append(Search.Tag, value.value);
              router.push(`?${search.toString()}`, { scroll: false });
              // unfocus the input
              document.getElementById("tags-ac")?.blur();
            }
          }}
          {...getAutocompleteProps()}
        />
        <Autocomplete
          className="min-w-[10rem] flex-1"
          id="benefits-ac"
          options={BENEFITS.filter((r) => benefits.indexOf(r.value) < 0)}
          renderInput={(params) => (
            <TextField {...params} placeholder="Benefits" />
          )}
          value={null}
          onChange={(_, value) => {
            if (value) {
              search.append(Search.Benefit, value.value);
              router.push(`?${search.toString()}`, { scroll: false });
              // unfocus the input
              document.getElementById("benefits-ac")?.blur();
            }
          }}
          {...getAutocompleteProps()}
        />
        {isAdmin && (
          <select
            id="status"
            className="my-input min-w-[9rem]"
            defaultValue={status}
            onChange={(e) => {
              const statusVal = e.currentTarget?.value;
              if (statusVal) {
                search.set(Search.Status, statusVal);
              } else {
                search.delete(Search.Status);
              }
              router.push(`?${search.toString()}`, { scroll: false });
            }}
          >
            <option value="">By status</option>
            {AllJobStatus.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}
        <select
          id="sortyBy"
          className="my-input min-w-[9rem]"
          defaultValue={sort}
          onChange={(e) => {
            const sortVal = e.currentTarget?.value;
            if (sortVal) {
              search.set(Search.Sort, sortVal);
            } else {
              search.delete(Search.Sort);
            }
            router.push(`?${search.toString()}`, { scroll: false });
          }}
        >
          <option value="">Sorty by</option>
          {SortBy.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      {chipsCount > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {...toChips(getLocationsByValues(locations), Search.Location)}
          {...toChips(getRolesByValues(roles), Search.Role)}
          {comp ? (
            <span
              className={chipClass}
              onClick={() => {
                search.delete(Search.Compensation, String(comp));
                router.push(`?${search.toString()}`, { scroll: false });
              }}
            >
              💰 From: ${Math.round(comp / 1000)}k/y {close}
            </span>
          ) : null}
          {...toChips(getTagsByValues(tags), Search.Tag)}
          {...toChips(getBenefitsByValues(benefits), Search.Benefit)}
          {chipsCount > 1 && (
            <span
              className="my-tag cursor-pointer border-danger/40 hover:bg-red-50"
              onClick={() => {
                router.push("?", { scroll: false });
              }}
            >
              Clear all {close}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
