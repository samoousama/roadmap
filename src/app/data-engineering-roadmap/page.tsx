import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";

import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['stripe-buy-button']: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export const revalidate = 86_400; // 60 * 60 * 24; revalidate at most every day


export default async function Home() {
  return (
    <>
      {/* Hero section **/}
      <Header />
      <section className="mx-auto max-w-7xl" id="home">
        <div className="relative flex isolate overflow-hidden px-8">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:pt-[40px] lg:pb-[40px] lg:text-left">
            <h2 className="text-[65px] font-bold leading-[70px] text-[#1F2937]">
              Data Engineering Roadmap 2024
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your step-by-step study plan in the world of Data technologies. 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="#benefits"
                className="bg-[#FF7437] w-[222px] h-[50px] items-center text-center justify-center rounded-[14px] uppercase text-[#fff] leading-[53px]">
                Get roadmap
              </a>
              <a href="#inside" className="my-btn-link border border-gray-400 w-[222px] h-[50px] items-center text-center justify-center rounded-[14px] uppercase leading-[53px]">
                What&apos;s Inside
              </a>
            </div>
            <p className="text-[#6B7280] mt-5">Your ultimate time saver <br/> Your Data Engineer career booster</p>
          </div>
        </div>
          <div className="absolute top-[80px] w-[700px] h-[739px] right-0">
            <Image
              className="mx-auto"
              src="/images/banner-img.png"
              alt="Nata in Data"
              width={1512}
              height={1604}
              priority={true}
            />
          </div>
      </section>

      {/* stories section */}
      <section className="py-10 bg-[#FFFCF9] mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-flow-col gap-8">
            <div className="row-span-2">
              <div className="flex gap-[10px] rotate-[-7deg]">
                <div className="rounded-full min-w-[60px]">
                  <Image 
                    src="/images/paulaleiva.png"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
                <div className="bg-[#fff] p-5 shadow-md rounded-[15px]">
                  <h3 className="text-[#1F2937] text-[18px] leading-[28px] pb-[5px]">@paulaleiva.c</h3>  
                  <p className="text-[#374151] text-[16px] leading-[24px]">Hi Natalie, I wanted to thank you for the data engineer roadmap because it has helped me a lot to advance in my professional career. Today I feel like a data more prepared for new challenges thanks to you! ❤️</p>
                </div>
              </div>
              <div>
                <Image
                   src="/images/stories-arrow.png"
                   alt="" 
                   width={243}
                   height={191}
                />
              </div>
            </div>
            <div className="row-span-2">
            <div className="flex gap-[10px] rotate-[4deg]">
              <div className="rounded-full min-w-[60px] ">
                  <Image 
                    src="/images/aleofwellness.png"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
                <div className="bg-[#fff] p-5 shadow-md rounded-[15px]">
                  <h3 className="text-[#1F2937] text-[18px] leading-[28px] pb-[5px]">@aleofwellness</h3>  
                  <p className="text-[#374151] text-[16px] leading-[24px]">I really appreciate your efforts towards making such useful content</p>
                </div>
              </div>
              <div className="flex gap-[10px] rotate-[7deg] mt-10 relative left-[70px]">
              <div className="rounded-full min-w-[60px]">
                  <Image 
                    src="/images/alexiscorico.png"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
                <div className="bg-[#fff] p-5 shadow-md rounded-[15px]">
                  <h3 className="text-[#1F2937] text-[18px] leading-[28px] pb-[5px]">@alexiscorico</h3>  
                  <p className="text-[#374151] text-[16px] leading-[24px]">I really liked the recommendations you made in the road map.</p>
                </div>
              </div>
            </div>
            <div className="row-span-2">
              <div className="flex gap-[10px] rotate-[-7deg]">
                <div className="rounded-full min-w-[60px]">
                  <Image 
                    src="/images/aniketkandhari.png"
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
                <div className="bg-[#fff] p-5 shadow-md rounded-[15px]">
                  <h3 className="text-[#1F2937] text-[18px] leading-[28px] pb-[5px]">@aniketkandhari</h3>  
                  <p className="text-[#374151] text-[16px] leading-[24px]">Hey Natalie I wanted to thank you for this roadmap. I was looking for resources online but never actually got a structured path. SO this, I feel would surely give me a direction I needed.</p>
                </div>
              </div>
                <div className="text-right float-right mt-5">
                  <Image
                    src="/images/line-icon.png"
                    alt=""
                    width={40}
                    height={41}
                  />
                </div>
            </div>
          </div>
        </div> 
      </section>

      <section className="py-[40px] bg-[#fff]">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-[#1F2937] text-[48px] font-bold text-center">For Whom</h3>
          <div className="flex gap-[50px] items-end justify-between">
            <div className="mt-2">
              <strong className="text-[#1F2937] text-[36px] pb-[10px] block">If You...</strong>
              <ul className="text-[#1F2937]">
                <li className="text-[24px] pb-[5px] flex">
                  <Image 
                    className="mr-3"
                    src="/images/whom-check-ucon.png"
                    alt=""
                    width={34}
                    height={34}
                  />
                  Aspire to switch from a non-IT career to data engineering</li>
                <li className="text-[24px] pb-[5px] flex">
                  <Image 
                    className="mr-3"
                    src="/images/whom-check-ucon.png"
                    alt=""
                    width={34}
                    height={34}
                  />
                  Are a student hesitating about which career path to pursue</li>
                <li className="text-[24px] pb-[5px] flex">
                  <Image 
                    className="mr-3"
                    src="/images/whom-check-ucon.png"
                    alt=""
                    width={34}
                    height={34}
                  />
                  Have prior coding experience and heard of the opportunities in big data</li>
              </ul>
            </div>
            <div>
              <Image 
                src="/images/whom-arrow-1.png"
                alt=""
                width={163}
                height={118}
                />
            </div>
          </div>
          <div className="flex mt-10 items-center">
            <div className="w-[40%]">
              <Image  
                 src="/images/whom-arrow-3.png"
                 alt=""
                 width={135}
                 height={146}
              />
            </div>
            <div>
              <h3 className="text-[#1F2937] text-[36px] font-bold">And</h3>  
              <strong className="text-[#1F2937] text-[30px]">Come across figures like:</strong>
              <div className="bg-[#D5EBFF] py-5 px-5 mb-3">
               <p className="text-[24px] text-[#374151]">&quot;The average salary in the US is $131,610, with a range from $85,604 to $202,340, as reported by Indeed (May 2023).&quot;</p>
              </div>
              <p className="text-[#1F2937] text-[24px]">Which have sparked your interest and fuelled your career aspirations.</p>
            </div>
          </div>
          <div className="mt-5">
            <div>
              <h3 className="text-[36px] text-[#1F2937] font-bold">But</h3>
              <p className="text-[#1F2937] text-[24px]">Intimidated by Data Engineer tools landscape (and I’m pretty sure not all of them are listed):</p>
            </div>
          </div>
          <div className="text-center mt-5 flex justify-center relative">
            <Image
              src="/images/whom-image.png"
              className="mx-auto"
              alt=""
              width={843}
              height={432}
            />  
            <div className="absolute right-[0px] bottom-[60px]">
            <Image
              src="/images/whom-arrow-2.png"
              className="mx-auto"
              alt=""
              width={128}
              height={131}
            />
            </div>
          </div>
          <div className="mt-10">
            <p className="text-[24px] text-[#1F2937]">This roadmap is the ultimate time-saver and the booster for your Data Engineer career 💪</p>
            <div className="text-center mt-[30px]">
              <a href="#benefits" className="bg-[#FF7437] px-[80px] text-[#fff] text-[24px] h-[50px] leading-[54px] rounded-[14px] inline-block">GET ROADMAP</a>
            </div>
          </div>
        </div>
      </section>

      {/* My Personal Journey */}
      <section className="bg-[#FFFCF9] py-[80px]">
         <h3 className="text-center text-[#1F2937] text-[48px] font-bold">My Personal Journey</h3>
         <div className="mx-auto max-w-7xl mt-[50px]">
          <div className="flex items-center">
            <div>
              <p className="text-[#111827] text-[24px] leading-[32px] mb-[20px]">Tbh, my DE career started accidentally, when I’ve been actively looking for Junior Python developer jobs.🤫</p>
              <p className="text-[#111827] text-[24px] leading-[32px]">Then all of a sudden got an opportunity from PepsiCo:</p>
              <div className="flex gap-[10px] mt-10">
                <div>
                  <Image
                    src="/images/pepsi-icon.png"
                    alt=""
                    width={46}
                    height={46}
                  />
                </div>
                <div className="max-w-[400px]">
                  <div className="bg-[#FEF3C7] py-[15px] px-[25px] text-[#000000] text-[18px] rounded-[14px]">
                    Hey, we are looking for Junior Data Engineers, wanna join ?
                  </div>
                  <span className="text-[14px] text-[#6B7280] text-right block pt-2">2:10 am</span>
                </div>
              </div>
              <div className="flex mt-[40px] items-center">
                <div className="w-[30%]">
                  <Image
                    src="/images/single-arrow.png"
                    alt=""
                    width={168}
                    height={75}
                  />
                </div>
                <div className="flex gap-[10px]">
                  <div className="max-w-[400px]">
                    <div className="bg-[#FEF3C7] py-[15px] px-[25px] text-[#000000] text-[18px] rounded-[14px]">
                      Data Engineering? What is that? Is it even a good career path? I&apos;ve been learning like Docker, APIs, web frameworks, etc. How is all of that applied? How can I succeed with that?
                    </div>
                    <span className="text-[14px] text-[#6B7280] text-right flex justify-end gap-[5px] items-end pt-2">
                      2:15 am 
                      <Image 
                        alt=""
                        src="/images/double-check.png"
                        width={24}  
                        height={24}
                      />  
                    </span>
                  </div>
                  <div>
                    <Image
                      className="rounded-full"
                      src="/images/fi_732236.png"
                      alt=""
                      width={46}
                      height={46}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/pic.png"
                width={472}
                height={525}
                alt=""
              />
            </div>
          </div>
          <div className="mt-14">
            <div className="bg-[#D5EBFF] px-[15px] py-[15px] inline-flex gap-[10px] rounded-[14px]">
              <div>
                <Image
                  className="mt-[5px]"
                  src="/images/alter-img.png"
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <p className="text-[#4B5563] text-[24px]">But after some research, I&apos;ve understood that DE is a highly, hiiiiighly promising career, that sweet spot between software engineering and data analysis.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 relative max-w-[800px]">
            <h3 className="text-[#111827] text-[30px] font-bold">So I took the leap of faith...</h3>
            <div className="absolute right-0 top-[-30px]">
              <Image
                src="/images/arrow-left-rotate.png"
                alt=""
                width={207}
                height={117}
              />
            </div>
          </div>
          <div className="flex mt-[70px]">
            <div className="w-[60%]">
              <h2 className="text-[#111827] text-[36px] leading-[46px] mb-0 font-bold">
                And now a Senior Data Engineer at TripAdvisor, AWS and Google <br/> certified, wrangling gazillion of data.
              </h2>
              <div className="bg-[#FF7437] h-[6px] w-[70%] mt-[10px]"></div>
            </div>
            <div className="relative">
              <ul className="flex">
                <li><a href="">
                  <Image
                    alt=""
                    src="/images/tripadvisor-logo.png"
                    width={163}
                    height={163}
                  />  
                </a></li>
                <li><a href="">
                  <Image
                    alt=""
                    src="/images/google-logo.png"
                    width={163}
                    height={163}
                  />  
                </a></li>
                <li><a href="">
                  <Image
                    alt=""
                    src="/images/aws-logo.png"
                    width={163}
                    height={163}
                  />  
                </a></li>
              </ul>
              <div className="absolute right-[-40px] top-[-70px]">
                <Image
                    alt=""
                    src="/images/vector-img.png"
                    width={88}
                    height={81}
                  />  
              </div>
            </div>
          </div>
          <div className="text-center mt-[50px]">
            <a href="#benefits" className="bg-[#FF7437] px-[80px] text-[#fff] text-[24px] h-[50px] leading-[54px] rounded-[14px] inline-block">GET ROADMAP</a>
          </div>
         </div>


      {/* Testimonial section */}
      <div className="bg-[#FF7437] relative mt-[150px]">
        <div className="absolute top-0 h-[20px] w-[100%] bg-[#fff]"></div>
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-[20px] items-center">
              <div className="w-[60%] relative z-[9999]">
            <Image
              src="/images/testimonial-pic.png"
              alt=""
              width={357}
              height={475}
            />
          </div>
          <div>
          <Image
              src="/images/quote-Icon.png"
              className="mb-[20px]"
              alt=""
              width={48}
              height={48}
            />
            <h3 className="text-[#fff] text-[30px] leading-[36px] font-medium">Unfortunately, I made lots of mistakes on the way, i.e. picking the wrong technology to grasp, useless courses, getting overwhelmed by the quantity of information, and so on.</h3>
            <div className="mt-5 text-[16px] text-[#fff]">
              <span className="block">Natalie</span>
              <span className="block">Senior Data Engineer</span>
            </div>
          </div>
        </div>
        </div>
        <div className="absolute bottom-0 h-[20px] w-[100%] bg-[#fff]"></div>
      </div>
      </section>

      {/* Avoid Mistakes Section */}
      <section className="py-[40px]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-[#1F2937] text-[48px] leading-[50px] text-center font-bold">But you can Avoid All Those Mistakes <br/> And Save Time</h2>
          <p className="text-[#6B7280] text-[18px] leading-[28px] text-center pt-[15px]">You have this roadmap to lead you through the data forest on the shortest path. So you can avoid all that <br/> hustle and boost your Data Engineer career</p>
          <div className="relative mt-10">
            <div className="mt-1">
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px] ml-[10em]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Which tools should i study?</div>
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px] ml-[6em]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />When Should i learn cloud technologies?</div>
              <div className="flex justify-end mr-[4em]">
                <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Should i prioritize mastering SQL or Python?</div>
              </div>
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Is it better to learn kafka or Airflow first?</div>
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px] ml-[7em]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Among numerous Python Courses, which one is for Data Engineer?</div>
              <div className="flex justify-end">
                <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Where can i practice advanced SQL topics?</div>
              </div>
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Do i need to learn java or immediatly dive into Databricks or hadoop?</div>
              <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px] ml-[5em]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />Should i familiarize myself with Data Science concepts and linear regression?</div>
              <div className="flex justify-center">
                <div className='text-[#1F2937] text-[24px] bg-[#FFF7ED] p-[15px] py-[10px] rounded-[10px] table mb-[10px] relative pl-[40px]'><Image src="/images/circle-img.png" alt="" width={12} height={12} className="absolute left-[15px] top-[20px]" />What pet projects should I work on?</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-[30px] relative">
            <p className="text-[#1F2937] text-[24px] leading-[32px]">And many more questions you can have down the road</p>
            <div className="absolute right-[50px] top-[-30px]">
              <Image 
                src="/images/single-arrow-icon.png"
                alt=""
                width={130}
                height={107}
              />
            </div>
          </div>
          <div className="text-center mt-[50px]">
            <a href="" className="bg-[#FF7437] px-[80px] text-[#fff] text-[24px] h-[50px] leading-[54px] rounded-[14px] inline-block">GET ROADMAP</a>
          </div>
        </div>
      </section>

      {/* Road map section */}
      <section className="bg-[url('/images/Roadmap-preview.png')] py-[60px]" id="inside">
        <div className="text-center"> 
          <h3 className="text-[#1F2937] text-[48px] font-bold leading-[50px] text-center">Roadmap 2024</h3>
        </div>
        <div className="text-right justify-end flex mt-[60px] relative">
          <div className="absolute left-[150px]">
            <Image
              src="/images/road-map-arrow.png"
              alt=""
              width={155}
              height={71}
            />
          </div>
          <Image
            src="/images/road-mapillustr.png"
            alt=""
            width={1280}
            height={444}
          />
        </div>
        {/*<div className="text-center mt-[50px]">*/}
        {/*  <a href="" className="bg-[#FF7437] px-[80px] text-[#fff] text-[24px] h-[50px] leading-[54px] rounded-[14px] inline-block">GET ROADMAP</a>*/}
        {/*</div>*/}
      </section>

      {/* Everything you need section */}
      <section className="bg-[#fff] py-[80px]" id="benefits">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-[30px]">
            <div>
              <h3 className="text-[#000] text-[48px] font-bold leading-[60px]">Everything you need for <b className="text-[#FF7437]">$45</b></h3>
              <div className="bg-[#D5EBFF] text-[#6B7280] text-[18px] py-[5px] px-[15px] rounded-[10px] table mt-[10px]">
                + Free CV Review (worth $35)
              </div>
              <div className="flex  gap-[20px] mt-10">
                <div>
                  <ul className="grid">
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      105+ tools & concepts are included
                    </li>
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      Clear guidance on which tools & concepts to prioritize
                    </li>
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      Each point is linked to relevant resources/courses/explanations/videos. The roadmap = Personal study plan
                    </li>  
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      It’s structured, categorizing the path into sectors like Data Fundamentals, Programming Languages, Storage, Data Warehouses, AI (LLM’s, Data science topics), etc.
                    </li>                                        
                  </ul>
                </div>
                <div>
                  <ul className="grid">
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      Every resource is handpicked for its value and to teach you in the best way
                    </li>
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      A comprehensive guide on Data Engineering Certifications, from exam tips to free practice questions
                    </li>
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      Access to 9 Pet project examples. This is the most important part: you will have examples with STEP-BY-STEP implementation. I&apos;ve been literally collecting those bit by bit.
                    </li>  
                    <li className="text-[#6B7280] text-[14px] leading-[20px] inline-flex gap-[15px] mb-[20px]">
                      <Image 
                          src="/images/green-tik.png"
                          alt=""
                          width={16}
                          height={12}
                          className="h-[12px]"
                      />
                      It&apos;s interactive, as I constantly find something new to add and upgrade. You stay on top of the trends. No more stale, old-school pdf&apos;s.
                    </li>                                        
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-[70%]">
              <script async src="https://js.stripe.com/v3/buy-button.js"></script>
              <stripe-buy-button
                  buy-button-id="buy_btn_1OM7yvEevB5t7ZCeXT0FPeL2"
                  publishable-key="pk_live_51O0rRQEevB5t7ZCezSEJObIGsZGHfRSLUfKNtLaEjOqfbIMihcWLn1S6kg0yFr6OAYVxBT3cyNXZhpzTPrprDLge00iG2lU68u"
              >
              </stripe-buy-button>
            </div>
          </div>
        </div>
      </section>

      {/* It Helped Hundreds of Amazing People */}
      <section className="bg-[#FFFCF9] py-[80px]">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-[20px] text-center text-[#1F2937] text-[48px] leading-[50px] font-bold">It Helped Hundreds of Amazing People</h3>
          <p className="text-center text-[18px] text-[#6B7280] leading-[28px] mb-[80px]">This beautifully designed roadmap outlines the essential tools and concepts required to become a Data <br/> Engineer. It helped many newcomers and professionals alike.</p>
          <div className="flex gap-[20px]">
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I really appreciate your efforts towards making such useful content</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-1.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Urwa Usama</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@taleofwellness</span>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>Thx! You have great content!! Appreciate all help you put up for fellow techies!</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-2.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Lena</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@lenakrasnichenko</span>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I really liked the recommendations you made in the road map.</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-3.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Alexis Corico</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@alexiscorico</span>
                </div>
              </div>
            </div>
            {/* card */}                        

          </div>
          {/* row 2 */}
          <div className="flex gap-[20px]">
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>Hey Natalie I wanted to thank you for this roadmap. I was looking for resources online but never actually got a structured path. SO this, I feel would surely give me a direction I needed.</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-4.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Aniket Kandhari</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@aniketkandhari</span>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I liked that it was very thorough and gave me a good idea of what I need to learn.</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-5.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Matt</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@mattnaras</span>
                </div>
              </div>
            </div>
            {/* card */}                        

          </div>
          {/* row 3 */}
          <div className="flex gap-[20px]">
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I found the roadmap excellent, what I liked most are the recommendations that you have placed with heart and also the format, since it is very easy to understand where to start learning.</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-6.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Mohamad</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@code_moe</span>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I sincerely feel that there is nothing to modify, I loved the structure, the design and the material that comes in the links. Thank you very much for the material Nata, I hope you have a nice week! ☺️</p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-7.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Mitch</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@smt888</span>
                </div>
              </div>
            </div>
            {/* card */}
            <div className="bg-[#fff] border-[1px] border-[#E5E7EB] py-[10px] px-[10px] mb-[10px]">
              <p>I wanted to thank you for the data engineer roadmap because it has helped me a lot to advance in my professional career. Today I feel like a data more prepared for new challenges thanks to you! </p>
              <div className="flex gap-[10px] items-center mt-[5px]">
                <Image
                  src="/images/people-8.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <div>
                  <strong className="block text-[#1F2937] text-[18px] leading-[28px]">Paula Leiva</strong>
                  <span className="block text-[#9CA3AF] text-[14px] leading-[20px]">@paulaleiva.c</span>
                </div>
              </div>
            </div>
            {/* card */}                        
          </div>          
          <div className="text-center mt-[50px]">
            <a href="" className="border-[#FF7437] border-[2px] px-[80px] text-[#FF7437] text-[24px] h-[50px] leading-[54px] rounded-[14px] inline-block uppercase">See More</a>
          </div>
        </div>
      </section>

      {/* Social media */}
      <section className="bg-[url('/images/social-media-bg.png')] py-[60px]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h3 className="text-[#1F2937] text-[48px] leadnig-[50px] font-bold">My Social Media</h3>
            <p className="text-[#6B7280] text-[18px] leading-[28px]">Explore Valuable Content on My Social Media Platforms</p>
          </div>
          <div className="flex gap-[40px] justify-between mt-[40px]">
            <div className="relative">
              <Image
                src="/images/Ilustr-social.png"
                alt=""
                width={616}
                height={343}
              />
              <div className="mt-[40px]">
                <b className="text-[#000000] text-[18px] leading-[28px] block mb-[20px]">Follow me:</b>
                <div className="mb-[20px]">
                <a href="https://www.instagram.com/nataindata/" className="text-[#1F2937] text-[18px] border-[1px] bg-[#FFF7ED] rounded-[8px] border-[#FF7437] p-[10px] inline-flex items-center gap-[10px] font-medium hover:bg-[#FED7AA] min-w-[240px]">
                  <Image
                    src="/images/Insta.png"
                    alt=""
                    width={30}
                    height={30}
                  />                  
                  Follow on Instagram
                </a>
                </div>
                <div className="mb-[20px]">
                <a href="https://www.youtube.com/@nataindata?sub_confirmation=1" className="text-[#1F2937] text-[18px] border-[1px] bg-[#FFF7ED] rounded-[8px] border-[#FF7437] p-[10px] inline-flex items-center gap-[10px] font-medium hover:bg-[#FED7AA] min-w-[240px]">
                  <Image
                    src="/images/Youtube.png"
                    alt=""
                    width={31}
                    height={30}
                  />                  
                  Follow on YouTube
                </a>
                </div>
              </div>
              <div className="absolute right-[0px] bottom-[70px]">
                <Image
                  src="/images/social-media-arrow.png"
                  alt=""
                  width={207}
                  height={117}
                />
              </div>
            </div>
            <div>
            <Image
                src="/images/insta-gallery.png"
                alt=""
                width={361}
                height={571}
              />
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-[#1F2937]">
        <div className="mx-auto block max-w-7xl flex-col items-center justify-start gap-6 py-[50px]">
          <div className="flex flex-wrap justify-center gap-10 mb-[25px]">
            <Link href="/" className="my-btn-link text-[#9CA3AF] hover:text-[#fff]">
              Home
            </Link>
            <Link href="/jobs" className="my-btn-link text-[#9CA3AF] hover:text-[#fff]">
              Jobs
            </Link>
            <Link href="/blog" className="my-btn-link text-[#9CA3AF] hover:text-[#fff]">
              Blog
            </Link>
            <Link href="/blog/about/" className="my-btn-link text-[#9CA3AF] hover:text-[#fff]">
              Whois
            </Link>
          </div>
          <div className="text-center justify-center flex items-center gap-[20px] mb-[25px]">
            <Link href="https://www.youtube.com/@nataindata?sub_confirmation=1">
              <Image
                src="/images/footer-Youtube.png"
                alt=""
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.instagram.com/nataindata/">
              <Image
                src="/images/footer-insta.png"
                alt=""
                width={24}
                height={24}
              />
            </Link>
          </div>
          <div>
            <p className="text-center text-base text-[#9CA3AF] text-[16px]">
              © {new Date().getFullYear()}. All rights reserved.{" "}
              <Link
                href="/legal/privacy"
                className="foc hover:text-primary-700"
              >
                Privacy
              </Link>
              .{" "}
              <Link href="/legal/terms" className="foc hover:text-primary-700">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>
      
    </>
  );
}
