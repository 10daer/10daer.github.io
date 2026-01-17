import { useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  ForwardedRefWrapper,
  Project,
  SectionHeading,
  TextReveal,
} from "../components";
import { useGlobalContext } from "../contexts";
import { works } from "../data-station";

export default function Works() {
  const pRef = useRef(null);
  const isInView = useInView(pRef, {
    amount: 0.3,
    margin: "-35% 0px -10% 0px",
  });

  const { handleAddToRefs } = useGlobalContext();

  const projectContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="text-white mt-24 pb-1" id="works">
      <div className="mt-20">
        <SectionHeading>Selected Works*</SectionHeading>
        <p
          ref={pRef}
          className="text-center leading-snug font-normal text-base"
        >
          <TextReveal word="[By Your Truly😉]" index={0} isInView={isInView} />
        </p>
      </div>
      <ForwardedRefWrapper
        data="1"
        ref={handleAddToRefs}
        as="div"
        className="wrap"
      >
        <ul className="relative" ref={projectContainerRef}>
          {works.map((work, index) => {
            const targetScale = 1 - (works.length - index) * 0.05;
            return (
              <Project
                target={targetScale}
                progress={scrollYProgress}
                range={[index / (works.length - 1), 1]}
                work={work}
                index={index}
                key={`work_${index}`}
              />
            );
          })}
        </ul>
      </ForwardedRefWrapper>
    </section>
  );
}
