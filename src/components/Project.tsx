import { motion, MotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts";
import ForwardedRefWrapper from "./ForwardedRefWrapper";
import LinkButton from "./LinkButton";
import TextReveal from "./TextReveal";
import { IProject } from "./types";

export default function Project({
  index,
  work,
  target,
  range,
  progress,
}: IProject) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setLoading, handleAddToProjectsRefs } = useGlobalContext()

  const { src, message, title, projectId } = work;
  const project = useRef(null);

  const details = useRef(null);
  const isInView = useInView(details, { margin: "-5%" });

  const { scrollYProgress } = useScroll({
    target: project,
    offset: ["start 0.75", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const scale = useTransform(progress as MotionValue, range as number[], [1, target]);

  function handleNavigation() {
    const to = `works/${projectId}`
    if (pathname === to) return
    setLoading(true)
    navigate(to)
  }

  return (
    <ForwardedRefWrapper as="li" ref={handleAddToProjectsRefs}
      className="h-screen flex justify-center items-center sticky top-0"
    >
      <motion.div
        onClick={handleNavigation}
        ref={project}
        style={{
          scale,
          "--offset": `${0.25 * index}rem`,
        } as { [key: string]: string | MotionValue<number> }}
        className={`relative ${index % 2 === 0 ? "bg-[#2f251e]" : "bg-[#43392f]"} relative top-[calc(var(--offset))] origin-top grid grid-rows-[5rem_1fr] w-[calc(100%-24px)] xs:w-[calc(100%-96px)] grid-areas-["title" "image" "description"] h-4/5 md:w-[80%] lg:w-[80%] xl:w-[70%]  2xl:w-[60%]`}>
        <h2 className="grid-in-title px-6 max-h-20 flex justify-between items-center border-b border-gray-300 uppercase leading-none font-normal text-[clamp(0.875rem,3vw,1.25rem)]">
          <i className="">{title}</i>
          <LinkButton className="md:hidden" to={`works/${projectId}`}>
            <FaArrowRightLong color="white" size={20} />
          </LinkButton>
        </h2>

        <div className="flex flex-col justify-evenly h-full items-start w-full md:flex-row md:px-6 lg:max-h-[34rem]">
          <div className="overflow-hidden w-full h-[60%] md:h-full grid place-content-center relative">
            <motion.div
              style={{ scale: imageScale, backgroundImage: `url("/${src}")` }}
              className={`size-[90vw] max-h-[18rem] xs:size-[60vw] sm:size-[45vw] lg:size-[30vw] bg-contain bg-center bg-no-repeat p-8 overflow-hidden grid place-content-center relative`}
            >
            </motion.div>
          </div>

          <p
            ref={details}
            className="font-normal space-x-[6px] w-full pr-5 text-body-lg m-0 self-end text-right leading-snug max-w-[80vw] md:max-w-[30vw] md:self-start md:pr-0  md:m-5"
          >
            {message.split(" ").map((word, index) => {
              return (
                <TextReveal
                  key={index}
                  word={word}
                  index={index}
                  isInView={isInView}
                />
              );
            })}
          </p>
        </div>
      </motion.div >
    </ForwardedRefWrapper >
  );
}
