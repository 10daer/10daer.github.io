import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { descriptionSlideUp, descriptionOpacity } from "@/animations";

export default function Description() {
  const phrase =
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div ref={description} className="px-5 mt-5 flex justify-center">
      <div className="flex gap-12 relative">
        <p className="m-0 description">
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className="mask">
                <motion.span
                  variants={descriptionSlideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p
          variants={descriptionOpacity}
          animate={isInView ? "open" : "closed"}
        >
          The combination of my passion for design, code & interaction positions
          me in a unique place in the web design world.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}></div>
      </div>
    </div>
  );
}
