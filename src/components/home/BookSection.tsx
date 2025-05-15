import Image from "next/image";

export default function BookSection() {
  return (
    <section
      className="mt-2 bg-[#F9FAFB] px-8 py-4 lg:mt-8 lg:py-12"
      id="free-book"
    >
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <div className="relative w-full max-lg:h-96 lg:w-1/2">
          <Image
            src="/images/fundamentals-book.webp"
            className="object-contain"
            fill
            alt="Fundamentals of Data Engineering book cover"
          />
        </div>
        <div className="mt-2 w-full lg:w-1/2">
          <div className="text-center lg:text-left">
            <h2 className="text-base font-semibold leading-7 text-pink-800">
              FREE DIGITAL DOWNLOAD
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Fundamentals of Data Engineering
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Receive a free digital edition courtesy of NataInData.
              <br />
              <br /> Understand how to apply the concepts of data generation,
              ingestion, orchestration, transformation, storage, and governance
              that are critical in any data environment. Learn how to stitch
              together a variety of cloud technologies to serve the needs of
              downstream data consumers.
            </p>
          </div>
          <form className="mx-auto mt-4 flex max-w-sm flex-col gap-4 lg:mx-0">
            <input
              aria-label="Email address"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="my-input flex-auto"
            />
            <button className="my-btn" type="submit">
              Download now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
