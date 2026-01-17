import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { headingSlideUp } from "../animations";
import { ISectionHead } from "./types";

export default function SectionHeading({ children, id, styles }: ISectionHead) {
  const sectionHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const isInView = useInView(sectionHeadingRef, {
    amount: 0.1,
    margin: "-15% 0px -20% 0px",
    once: styles ? true : false,
  });
  const headings = (children as string).split(" ");

  return (
    <h2
      id={id}
      ref={sectionHeadingRef}
      className={`uppercase flex justify-center items-center max-w-sm lg:max-w-2xl mx-auto text-section-head text-secondary-600 ${styles}`}
      style={{ perspective: "1000px" }}
    >
      <span
        className="justify-center gap-0 items-center text-justify flex flex-wrap"
        style={{ clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)" }}
      >
        {headings.map((heading: string, index: number) => (
          <span className="relative mr-4 overflow-hidden inline-flex" key={index}>
            <motion.span
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "bottom",
              }}
              variants={headingSlideUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
            >
              {heading}
            </motion.span>
          </span>
        ))}
      </span>
    </h2>
  );
}
