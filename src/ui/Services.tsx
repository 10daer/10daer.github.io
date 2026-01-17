import { useState } from "react";
import { DotLoader, ForwardedRefWrapper, SectionHeading, Service, Socials } from "../components";
import { useGlobalContext } from "../contexts";
import { services } from "../data-station";
import { IService } from "./types";

export default function Services() {
  const [activeBoxIndex, setActiveBoxIndex] = useState<number | null>(null);

  const { handleAddToRefs } = useGlobalContext();

  const handleBoxClick = (index: number) => {
    if (activeBoxIndex === index) {
      setActiveBoxIndex(null);
    } else {
      setActiveBoxIndex(index);
    }
  };

  return (
    <>
      <section id="my-services" className="lg:w-[86%] mx-auto px-6 sm:px-12 lg:px-24 xl:px-36 2xl:px-44">
        <SectionHeading>WHat am i good at?</SectionHeading>
        <ForwardedRefWrapper
          data="0"
          ref={handleAddToRefs}
          id="services"
          className="text-secondary-200 pt-10 pb-20"
          as="div"
        >
          <div className="space-y-4 pb-16">
            <h3 className="text-h3 flex justify-start items-end gap-2 2xl:px-32 2xl:text-7xl font-semibold leading-tight">
              My strength  <DotLoader />
            </h3>
            <p className="text-body-lg 2xl:px-32 2xl:text-3xl">
              I focus on all things web and software development related. With each of my services, my goal is to deliver a clean and elevating digital experience for everyone. Also i have a couple of go to tech stacks to make any projects or solution happen. With eagerness to learn more about my current stack, and new technologies that could expand my horizons, i guarantee you of utmost satisfaction when offered a change to showcase my super power.
            </p>
          </div>
          {services.map((service: IService, index: number) => (
            <Service
              isActive={activeBoxIndex === index}
              setIsActive={handleBoxClick}
              index={index}
              serviceObj={service}
              key={`service-${index}`}
            />
          ))}
        </ForwardedRefWrapper>
      </section>
      <div className="px-6 trigger xs:px-12 md:px-24 xl:px-36 2xl:px-32 h-[56vh] sm:py-16 w-full md:pb-24 xs:h-full" >
        <SectionHeading styles="my-8 md:text-7xl md:leading-[0.9] lg:leading-none lg:text-[5.25rem]">
          thought you'd never ask! let's create magic together!
        </SectionHeading>
      </div>
      <Socials />
    </>
  );
}
