import { motion } from "framer-motion";
import { detailSlideUp } from "../animations";
import DotLoader from "./DotLoader";
import { ITextReveal } from "./types";

export default function TextReveal({
  styles,
  index,
  isInView,
  word, font, dot
}: ITextReveal) {
  return (
    <span
      className={`${styles ? styles : ""} relative mr-1 overflow-hidden inline-flex`}
    >
      <motion.span
        variants={detailSlideUp}
        custom={index}
        animate={isInView ? "open" : "closed"}
        key={index}
        className={`${font ? font : ""} flex justify-center items-center`}
      >
        {(styles && word !== "") ? (
          <> <span className="w-2 animate-pulse h-2 mr-1 sm:mr-3 bg-white rounded-full"></span> {word} {dot && <DotLoader />} </>
        ) : <>{word}{dot && <DotLoader />} </>}
      </motion.span>
    </span>
  );
}
