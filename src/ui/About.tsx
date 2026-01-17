import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { SectionHeading, TextReveal } from "../components";
import profileImg from "/img/profile.webp";

export default function About() {
  const subHead = useRef<HTMLHeadingElement | null>(null);

  const isSubInView = useInView(subHead, {
    margin: "-15% 0%",
    amount: 0.5,
    once: true,
  });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", "0%"]
  );

  return (
    <section id="about" className="md:mb-20 my-20 mb-48 px-6 sm:px-12 lg:px-24 xl:px-36 2xl:px-44">
      <SectionHeading styles="my-12">About me</SectionHeading>

      <div ref={containerRef} className="flex relative flex-col text-accent-400 mx-auto items-start gap-8 md:flex-row lg:gap-16 lg:w-[86%] lg:mx-auto">
        <motion.div style={window.innerWidth < 480 ? { y: imageY } : {}}
          className="pt-16 top-0 sm:top-20 sm:pt-0 overflow-hidden rounded-md sticky md:w-[100%] md:grow z-[1]">
          <img
            loading="lazy"
            className="aspect-square h-auto w-full rounded-md object-cover object-center md:aspect-auto"
            src={profileImg}
            width="600"
            height="800"
            alt="portrait image of Huy standing in front of a tree and foliage"
          />
          <div className="absolute inset-0 bg-secondary -z-[1]" />
        </motion.div>

        <motion.div className="top-20 z-0 h-full sm:sticky lg:top-32 md:w-3/6"
          initial={window.innerWidth < 480 && { opacity: 0, y: 100 }}
          whileInView={window.innerWidth < 480 ? { opacity: 1, y: 0 } : {}}
          transition={window.innerWidth < 480 ? { duration: 0.5 } : {}}>
          <div className="w-full h-full space-y-4 2xl:space-y-10">
            <h3
              ref={subHead}
              className="text-h3 md:text-3xl"
            >
              {"Actually of all the stories i've told this is my favorite"
                .split(" ")
                .map((word, index) => (
                  <TextReveal
                    key={`head-${index}`}
                    word={word}
                    index={index}
                    isInView={isSubInView}
                    styles=""
                  />
                ))}
            </h3>
            <p className="translate-y-0 h-full pl-1 md:p-0 text-gray-900 text-[clamp(1.25rem,1.5vw,1.5rem)]">
              10daer is an independent Full Stack developer based in Osun, Nigeria,
              specializing in both front-end and back-end development.
              <br />
              <br />
              I leverage technologies like React, Next.js, and various
              frameworks to bring my clients&apos; ideas to life with robust
              solutions.
              <br />
              Crafting elevated, intuitive, and minimalistic designs
              for startups and small businesses to help them stand out in the
              digital landscape with a powerful impact. 😎
              <br />
              <br />
              When I&apos;m not developing, I enjoy staying updated on the
              latest trends in software and web development through extensive
              internet surfing. I also have a passion for music and basketball.
              You can find me actively engaging on social media, particularly.<span className="underline duration-300 ease-in-out hover:text-secondary-700"><a
                href="https://www.youtube.com/channel/UCBOAB9RV647G93GxLhEXleA"
              >
                <RiTwitterXFill />
              </a></span>
            </p>
            <p className="text-[clamp(1.25rem,1.5vw,1.5rem)] text-nav-background font-bold pt-4 md:block hidden">
              "I solve problems not by adding complexity but by removing it-delivering simple, effective solutions that drive impact"
            </p>
          </div>
        </motion.div>
      </div>

      <p className="text-[clamp(1.25rem,1.5vw,1.5rem)] pl-1 md:p-0 text-nav-background font-bold pt-4 block md:hidden">
        "I solve problems not by adding complexity but by removing it-delivering simple, effective solutions that drive impact"
      </p>
    </section>
  );
}
