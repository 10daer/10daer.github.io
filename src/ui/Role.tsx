import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ForwardedRefWrapper } from "../components";
import { useGlobalContext } from "../contexts";
import { ICharacter, IHeading, IWord } from "./types";

const text =
  "I create elevating digital experiences that inspire and connect with people through development and design";

function Heading({ slideElProgress }: IHeading) {
  const textElement = useRef(null);
  const { scrollYProgress: textELProgress } = useScroll({
    target: textElement,
    offset: ["start 0.5", "start 0.1"],
  });

  const words = text.split(" ");

  return (
    <h1
      ref={textElement}
      className="sticky top-0 h-screen flex max-w-[100vw] min-h-[600px] items-center lg:items-start justify-center text-accent-400 py-10 px-6 sm:px-12 md:px-16 lg:px-36 xl:px-40 2xl:px-52"
    >
      <span className="flex items-start w-full justify-center h-[90vh] sm:h-fit max-h-[48rem] gap-0 flex-wrap py-8 md:h-[90%] md:py-0 xl:pt-12 xl:pb-0">
        {words.map((word, i) => {
          const wordStart = i / words.length;
          const wordEnd = wordStart + 1 / words.length;
          return (
            <Word
              textElProgress={textELProgress}
              slideElProgress={slideElProgress}
              range={[wordStart, wordEnd]}
              key={i}
            >
              {word}
            </Word>
          );
        })}
      </span>
    </h1>
  );
}

function Word({ children, textElProgress, slideElProgress, range }: IWord) {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="mx-[6px] leading-[0.8] font-black text-[clamp(1.5rem,13vw,5.5rem)] xs:text-[clamp(3.75rem,9.5vw,4.75rem)] lg:text-[clamp(5.5rem,7.5vw,7.5rem)] sm:leading-[0.9] sm:mx-3 md:mx-2 flex items-center justify-center relative" >
      {
        characters.map((character, i) => {
          const characterStart = range[0] + step * i;
          const characterEnd = range[0] + step * (i + 1);
          return (
            <Character
              slideElProgress={slideElProgress}
              textElProgress={textElProgress}
              key={`c_${i}`}
              range={[characterStart, characterEnd]}
            >
              {character}
            </Character>
          );
        })
      }
    </span >
  );
}

function Character({
  children,
  range,
  slideElProgress,
  textElProgress,
}: ICharacter) {
  const shadowOpacity = useTransform(textElProgress, range, [0, 0.1]);
  const textOpacity = useTransform(slideElProgress, range, [0, 1]);

  return (
    <span>
      <motion.span className="absolute" style={{ opacity: shadowOpacity }}>
        {children}
      </motion.span>
      <motion.span style={{ opacity: textOpacity }} className="font-outline-1">
        {children}
      </motion.span>
    </span>
  );
}

export default function Role() {
  const sliderElement = useRef<HTMLDivElement | null>(null);
  const { handleAddToRefs } = useGlobalContext();

  const { scrollYProgress: sliderElProgress } = useScroll({
    target: sliderElement,
    offset: ["start end", "end end"],
  });

  return (
    <section id="my-role" className="min-w-screen">
      <ForwardedRefWrapper
        data="2"
        as="div"
        ref={handleAddToRefs}
        id="role"
        aria-label="role"
        className="relative flex w-full select-none flex-col items-start justify-center"
      >
        <Heading slideElProgress={sliderElProgress} />
        <div
          ref={sliderElement}
          className="sticky w-full bg-transparent-600 top-0 h-[200vh]"
        ></div>
      </ForwardedRefWrapper>
    </section>
  );
}
