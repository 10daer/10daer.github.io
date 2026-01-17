import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import SplitType, { TargetElement } from "split-type";
import { lineReveal, skillSlide } from "../animations";
import { IServiceObj } from "../ui/types";
import TextReveal from "./TextReveal";


export default function Service({
  serviceObj,
  isActive,
  setIsActive,
  index,
}: IServiceObj) {
  const { service, skills } = serviceObj;
  const serviceEl = useRef<HTMLSpanElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const addDotIndex = skills[skills.length - 1] === "" ? skills.length - 2 : skills.length - 1

  const isInView = useInView(headRef, { margin: "100% 0% 0% 0%", once: false })

  useEffect(() => {
    new SplitType(serviceEl.current as TargetElement, {
      types: "words,chars",
    });
  }, []);

  const handleInteraction = () => {
    if (!isActive) {
      shuffleAll();
    }
    setIsHovered(!isActive);
    setIsActive(index);
  };

  const shuffleAll = () => {
    if (serviceEl.current) {
      addShuffleEffect(serviceEl.current);
    }
  };

  const addShuffleEffect = (element: HTMLElement) => {
    const chars = element.querySelectorAll(".char");
    const originalText = [...chars].map((char) => char.textContent || "");
    const shuffleInterval = 10;
    const resetDelay = 75;
    const additionalDelay = 50;

    chars.forEach((char, index) => {
      setTimeout(() => {
        const interval = setInterval(() => {
          (char as HTMLElement).textContent = String.fromCharCode(
            97 + Math.floor(Math.random() * 26)
          );
        }, shuffleInterval);
        setTimeout(
          () => {
            clearInterval(interval);
            (char as HTMLElement).textContent = originalText[index];
          },
          resetDelay + index * additionalDelay
        );
      }, index * shuffleInterval);
    });
  };

  return (
    <div className="">
      <h2
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        ref={headRef}
        onClick={handleInteraction}
        className="head text-nowrap relative w-full overflow-hidden transition-all duration-500 md:duration-[50ms] ease-linear"
      >
        <span
          className={`absolute inset-0 transition-all duration-500 ease-in-out
          ${isHovered || isActive ? "scale-y-100 origin-center" : "scale-y-0 origin-center"}
          bg-[#987654]`}
        />
        <span className="relative flex justify-between font-grotesk items-center text-body-xl uppercase z-10 py-8 px-6 md:px-12 xl:px-24 2xl:px-32">
          <span ref={serviceEl}>{service}</span>
          <span>
            {isActive ? (
              <BiMinusCircle size={24} />
            ) : (
              <BiPlusCircle size={24} />
            )}
          </span>
        </span>
        <span className="w-full flex justify-start items-center">
          <motion.span
            style={{ transformOrigin: "left" }}
            variants={lineReveal}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="h-px self-start w-0 bg-secondary"
          ></motion.span>
        </span>
      </h2>

      <motion.div
        initial="collapsed"
        animate={isActive ? "open" : "collapsed"}
        variants={skillSlide}
        className="overflow-hidden"
      >
        <div className="h-fit grid grid-cols-1 md:grid-cols-2 text-service space-y-3 min-h-40 justify-start items-center px-6 md:px-12 xl:px-24 2xl:px-32 gap-2 place-items-start py-4">
          {skills.map((skill: string, index: number) => (
            <TextReveal
              key={index}
              index={index * 10}
              isInView={isActive}
              word={skill} dot={index === addDotIndex}
              styles="text-left text-nowrap font-general uppercase flex-auto"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
