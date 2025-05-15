"use client";
import ReactPlayer from "react-player/youtube";

export default function VideoSection() {
  return (
    <section className="pb-8 md:pt-12" id="video">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Learn from videos
          </p>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Check out my latest videos on YouTube.
          </p>
        </div>
        <div className="relative mx-auto mt-3 aspect-video h-full max-w-3xl md:mt-6">
          <ReactPlayer
            style={{
              borderRadius: "0.5rem",
              overflow: "clip",
            }}
            light={true}
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=qYzn2sZMXag"
          />

          {/* <iframe
              id="youtube-player"
              className="absolute left-0 top-0 h-full w-full"
              src={"https://www.youtube.com/embed/" + "M9NX-jgWpoA"}
              title="SQL tutorial for beginners with ChatGPT - Learn SQL for Free"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe> */}
        </div>
        <div className="mx-auto mt-6 flex w-full sm:justify-center">
          <a
            href="https://www.youtube.com/@nataindata/"
            className="my-btn-link group"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            View more videos
            <span className="ml-1 transition-all duration-200 group-hover:ml-2">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
