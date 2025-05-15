import Image from "next/image";

const positionsList = ["Data Engineers", "Data Scientists", "Data Analysts"];

export default function JobsSection() {
  return (
    <section
      className="mt-2 bg-[#F9FAFB] px-8 py-4 lg:mt-8 lg:py-12"
      id="free-book"
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="relative w-full max-lg:h-96 lg:w-1/2">
          <Image
            src="/images/job_list_4.png"
            className="object-contain"
            fill
            alt="Fundamentals of Data Engineering book cover"
          />
        </div>
        <div className="mt-2 w-full lg:w-1/2">
          <div className="text-center lg:text-left">
            <h2 className="text-base font-semibold leading-7 text-pink-800">
              📍 Locations: Europe, Asia
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Data Job Board
            </p>
            <div className="mt-6 text-lg leading-8 text-gray-600">
              <p>Jobs for Interns/Trainees/Juniors, as well as Middle & Senior:</p>
              <ul className="list-none">
                {positionsList.map((i) => (
                  <li className="mx-auto w-fit lg:mx-0" key={i}>
                    ✅ {i}
                  </li>
                ))}
              </ul>
              <p className="text-base">
                <br />
                P.S. The list is constantly updating + I get job
                offers/internships from recruiters
              </p>
            </div>
            <a
              className="my-btn my-5 inline-block"
              href="https://www.nataindata.com/jobs/"
            >
              View positions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
