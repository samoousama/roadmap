export const GA_MEASUREMENT_ID = "GTM-TTQCZWP";
export const COMPANY_PLACEHOLDER = "/images/office-building.png";

// type JobStatuesTypes =
//   | "Draft"
//   | "InReview"
//   | "Published"
//   | "Closed"
//   | "Rejected";

type JobStatusType = {
  label: string;
  value: string;
  color: string;
};

export const JobStatus = {
  Draft: {
    label: "Draft",
    value: "Draft",
    color: "#f1f5f9",
  },
  InReview: {
    label: "In Review",
    value: "InReview",
    color: "#fef9c3",
  },
  Published: {
    label: "Published",
    value: "Published",
    color: "#ccfbf1",
  },
  Closed: {
    label: "Closed",
    value: "Closed",
    color: "#f1f5f9",
  },
  Rejected: {
    label: "Rejected",
    value: "Rejected",
    color: "#fee2e2",
  },
};
type JobStatusKeys = keyof typeof JobStatus;

export const AllJobStatus = Object.keys(JobStatus).map(
  (k) => JobStatus[k as JobStatusKeys],
);

export const Search = {
  Location: "loc",
  Role: "role",
  Tag: "tag",
  Benefit: "ben",
  Sort: "sort",
  Compensation: "comp",
  Status: "status",
};

export const SortBy = [
  {
    label: "Newest first",
    value: "date",
    dbField: "postedAt",
  },
  {
    label: "Highest paid",
    value: "salary",
    dbField: "salaryMax",
  },
  // {
  //   label: "Most benefits",
  //   value: "benefits",
  // },
];

export const QuillModules = {
  toolbar: [
    // [{ header: [3, 4, 5, false] }],
    // [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      // { indent: "-1" },
      // { indent: "+1" },
    ],
    [{ align: [] }],
    ["link"],
    ["clean"],
  ],
};

export type Item<T = string> = {
  label: string;
  value: T;
};

export const PRIMARY_ROLES: Item[] = [
  {
    label: "Data Engineering",
    value: "DataEngineering",
  },
  {
    label: "Data Science",
    value: "DataScience",
  },
  {
    label: "Data Analytics",
    value: "DataAnalytics",
  },
  {
    label: "Software Development",
    value: "SoftwareDev",
  },
  {
    label: "Frontend",
    value: "Frontend",
  },
  {
    label: "Backend",
    value: "Backend",
  },
  {
    label: "Sales",
    value: "Sales",
  },
  {
    label: "Marketing",
    value: "Marketing",
  },
  {
    label: "Design",
    value: "Design",
  },
  {
    label: "Customer Support",
    value: "CustomerSupport",
  },
  {
    label: "Legal",
    value: "Legal",
  },
  {
    label: "QA (Quality Assurance)",
    value: "QA",
  },
  {
    label: "Testing",
    value: "Testing",
  },
  {
    label: "Non-tech",
    value: "Non-tech",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export const SALARY_MIN: Item<number>[] = [
  { label: "Unknown", value: 0 },
  { label: "$10,000 USD", value: 10_000 },
  { label: "$20,000 USD", value: 20_000 },
  { label: "$30,000 USD", value: 30_000 },
  { label: "$40,000 USD", value: 40_000 },
  { label: "$50,000 USD", value: 50_000 },
  { label: "$60,000 USD", value: 60_000 },
  { label: "$70,000 USD", value: 70_000 },
  { label: "$80,000 USD", value: 80_000 },
  { label: "$90,000 USD", value: 90_000 },
  { label: "$100,000 USD", value: 100_000 },
  { label: "$110,000 USD", value: 110_000 },
  { label: "$120,000 USD", value: 120_000 },
  { label: "$150,000 USD", value: 150_000 },
  { label: "$200,000 USD", value: 200_000 },
  { label: "$250,000 USD", value: 250_000 },
  { label: "$300,000 USD", value: 300_000 },
  { label: "$400,000 USD", value: 400_000 },
];
export const SALARY_MAX: Item<number>[] = [
  { label: "Unknown", value: 0 },
  { label: "$20,000 USD", value: 20_000 },
  { label: "$30,000 USD", value: 30_000 },
  { label: "$40,000 USD", value: 40_000 },
  { label: "$50,000 USD", value: 50_000 },
  { label: "$60,000 USD", value: 60_000 },
  { label: "$70,000 USD", value: 70_000 },
  { label: "$80,000 USD", value: 80_000 },
  { label: "$90,000 USD", value: 90_000 },
  { label: "$100,000 USD", value: 100_000 },
  { label: "$110,000 USD", value: 110_000 },
  { label: "$120,000 USD", value: 120_000 },
  { label: "$150,000 USD", value: 150_000 },
  { label: "$200,000 USD", value: 200_000 },
  { label: "$250,000 USD", value: 250_000 },
  { label: "$300,000 USD", value: 300_000 },
  { label: "$400,000 USD", value: 400_000 },
  { label: "$500,000 USD", value: 500_000 },
];

export const EMPLOYMENT_TYPE: Item[] = [
  { label: "Full-time", value: "Full-time" },
  { label: "Part-time", value: "Part-time" },
  { label: "Contractor", value: "Contractor" },
  { label: "Temporary", value: "Temporary" },
  { label: "Internship", value: "Internship" },
  { label: "Per diem (per day)", value: "PerDiem" },
  { label: "Volunteer", value: "Volunteer" },
];

// NOTE: tags are used as is, without converting them to a separate value
export const TAGS: Item[] = [
  { label: "Full stack", value: "Full stack" },
  { label: "Ops", value: "Ops" },
  { label: "Security", value: "Security" },
  { label: "SaaS", value: "SaaS" },
  { label: "Airflow", value: "Airflow" },
  { label: "Spark", value: "Spark" },
  { label: "Kubernetes", value: "Kubernetes" },
  { label: "Snowflake", value: "Snowflake" },
  { label: "dbt", value: "dbt" },
  { label: "Looker", value: "Looker" },
  { label: "Databricks", value: "Databricks" },
  { label: "Redshift", value: "Redshift" },
  { label: "BigQuery", value: "BigQuery" },
  { label: "Kafka", value: "Kafka" },
  { label: "SQL", value: "SQL" },
  { label: "AI/ML", value: "AI/ML" },
  { label: "API", value: "API" },
  { label: "Streaming", value: "Streaming" },
  { label: "Python", value: "Python" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Java", value: "Java" },
  { label: "NodeJS", value: "NodeJS" },
  { label: "English", value: "English" },
  { label: "Junior", value: "Junior" },
  { label: "Middle", value: "Middle" },
  { label: "Senior", value: "Senior" },
  { label: "Git", value: "Git" },
  { label: "Microsoft", value: "Microsoft" },
  { label: "Google Cloud", value: "Google Cloud" },
  { label: "AWS", value: "AWS" },
  { label: "Azure", value: "Azure" },
  { label: "Engineer", value: "Engineer" },
  { label: "Golang", value: "Golang" },
  { label: "Fully remote", value: "Fully remote" },
  { label: "On-site", value: "On-site" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "1-3 days a week in office", value: "1-3 days a week in office" },
];

export const BENEFITS: Item[] = [
  { label: "401(k)", value: "401k" },
  { label: "Distributed team", value: "DistributedTeam" },
  { label: "Dental insurance", value: "DentalInsurance" },
  { label: "Medical insurance", value: "MedicalInsurance" },
  { label: "Paid time off", value: "PaidTimeOff" },
  { label: "Learning budget", value: "LearningBudget" },
  { label: "Free gym membership", value: "FreeGym" },
  { label: "Mental wellness budget", value: "MentalWellness" },
  { label: "Home office budget", value: "HomeOffice" },
  { label: "Equity", value: "Equity" },
  { label: "No monitoring system", value: "NoMonitoring" },
  { label: "Company laptop/devices", value: "CompanyLaptop" },
  { label: "Paid parental leave", value: "PaidParental" },
  { label: "Regular Performance reviews", value: "PerformanceReviews" },
  { label: "Unlimited PTO", value: "UnlimitedPTO" },
  { label: "Training & Conferences", value: "TrainingConferences" },
  { label: "Flexible Work Environment", value: "FlexibleWorkEnv" },
  { label: "Flexible Working Hours", value: "FlexibleWorkingHours" },
  { label: "Off-sites", value: "OffSites" },
  { label: "Meals/Transportation refund", value: "MealsTransportation" },
  { label: "Mentorship", value: "Mentorship" },
];

export const LOCATIONS: Item[] = [
  { label: "🌍 Worldwide", value: "Worldwide" },
  { label: "🇪🇺 Europe", value: "Europe" },
  { label: "🚀 North America", value: "NorthAmerica" },
  { label: "⛩ Asia", value: "Asia" },
  { label: "💃 Latin America", value: "LatinAmerica" },
  { label: "🕌 Middle East", value: "MiddleEast" },
  { label: "🦁 Africa", value: "Africa" },
  { label: "🌊 Oceania", value: "Oceania" },
  { label: "🇦🇺 Australia", value: "Australia" },
  { label: "🇦🇹 Austria", value: "Austria" },
  { label: "🇧🇪 Belgium", value: "Belgium" },
  { label: "🇧🇷 Brazil", value: "Brazil" },
  { label: "🇧🇬 Bulgaria", value: "Bulgaria" },
  { label: "🇨🇦 Canada", value: "Canada" },
  { label: "🇭🇷 Croatia", value: "Croatia" },
  { label: "🇨🇾 Cyprus", value: "Cyprus" },
  { label: "🇨🇿 Czech Republic", value: "CzechRepublic" },
  { label: "🇩🇰 Denmark", value: "Denmark" },
  { label: "🇪🇪 Estonia", value: "Estonia" },
  { label: "🇫🇮 Finland", value: "Finland" },
  { label: "🇫🇷 France", value: "France" },
  { label: "🇩🇪 Germany", value: "Germany" },
  { label: "🇬🇷 Greece", value: "Greece" },
  { label: "🇭🇰 Hong Kong", value: "HongKong" },
  { label: "🇭🇺 Hungary", value: "Hungary" },
  { label: "🇮🇳 India", value: "India" },
  { label: "🇮🇩 Indonesia", value: "Indonesia" },
  { label: "🇮🇪 Ireland", value: "Ireland" },
  { label: "🇮🇹 Italy", value: "Italy" },
  { label: "🇯🇵 Japan", value: "Japan" },
  { label: "🇱🇻 Latvia", value: "Latvia" },
  { label: "🇱🇮 Liechtenstein", value: "Liechtenstein" },
  { label: "🇱🇹 Lithuania", value: "Lithuania" },
  { label: "🇱🇺 Luxembourg", value: "Luxembourg" },
  { label: "🇲🇾 Malaysia", value: "Malaysia" },
  { label: "🇲🇹 Malta", value: "Malta" },
  { label: "🇲🇽 Mexico", value: "Mexico" },
  { label: "🇳🇱 Netherlands", value: "Netherlands" },
  { label: "🇳🇿 New Zealand", value: "NewZealand" },
  { label: "🇳🇴 Norway", value: "Norway" },
  { label: "🇵🇱 Poland", value: "Poland" },
  { label: "🇵🇹 Portugal", value: "Portugal" },
  { label: "🇷🇴 Romania", value: "Romania" },
  { label: "🇸🇬 Singapore", value: "Singapore" },
  { label: "🇸🇰 Slovakia", value: "Slovakia" },
  { label: "🇸🇮 Slovenia", value: "Slovenia" },
  { label: "🇪🇸 Spain", value: "Spain" },
  { label: "🇸🇪 Sweden", value: "Sweden" },
  { label: "🇨🇭 Switzerland", value: "Switzerland" },
  { label: "🇹🇭 Thailand", value: "Thailand" },
  { label: "🇺🇦 Ukraine", value: "Ukraine" },
  { label: "🇦🇪 United Arab Emirates", value: "UAE" },
  { label: "🇬🇧 United Kingdom", value: "UnitedKingdom" },
  { label: "🇺🇸 United States", value: "USA" },
];

function getByValues<T>(
  allItems: Item<T>[],
  values?: string[],
): Item<T | string>[] {
  if (!values) return [];
  return values.map(
    (v) =>
      allItems.find((t) => t.value === v) ?? {
        label: v,
        value: v,
      },
  );
}

export const getTagsByValues = (tagValues?: string[]) => {
  return getByValues(TAGS, tagValues);
};

export const getLocationsByValues = (locationValues?: string[]) => {
  return getByValues(LOCATIONS, locationValues);
};

export const getBenefitsByValues = (benefitValues?: string[]) => {
  return getByValues(BENEFITS, benefitValues);
};

export const getRolesByValues = (roleValues?: string[]) => {
  return getByValues(PRIMARY_ROLES, roleValues);
};

export const getSalaryMinByValue = (salary: number) => {
  return (
    SALARY_MIN.find((s) => s.value === salary) ?? {
      label: `$${salary.toLocaleString("en-US")} USD`,
      value: salary,
    }
  );
};

export const getEmploymentType = (employmentType: string) => {
  return (
    EMPLOYMENT_TYPE.find((t) => t.value === employmentType)?.label ??
    employmentType
  );
};

export const getPrimaryRole = (primaryRole: string) => {
  return (
    PRIMARY_ROLES.find((t) => t.value === primaryRole)?.label ?? primaryRole
  );
};

export const getJobStatus = (status: string): JobStatusType => {
  if (JobStatus.hasOwnProperty(status)) {
    return JobStatus[status as JobStatusKeys];
  }
  return JobStatus.Draft;
};
