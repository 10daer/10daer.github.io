import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { arrowSlide, curve, menuSlide, slide } from "../animations";
import { navItems, socialLinks } from "../data-station";
import LinkButton from "./LinkButton";
import Magnetic from "./Magnetic";

export default function Header() {
  const { pathname } = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [size, setSize] = useState({ x: window.innerWidth, y: window.innerHeight / 5 })

  useEffect(() => {
    const handleResize = () => {
      setSize({ x: window.innerWidth, y: window.innerHeight / 5 })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-screen h-[calc(80%+50px)] z-[34] sm:h-[calc(80%+10px)] bg-nav-background text-nav-text fixed right-0 top-0"
    >
      <div className="size-full items-center sm:pb-2 flex flex-col justify-evenly pt-[20vh] xs:justify-end xs:gap-8 sm:pt-0">
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className="flex flex-col text-sub-head gap-2 sm:gap-0 w-full"
        >
          {navItems.map((data, index) => (
            <div onMouseEnter={() => {
              setSelectedIndicator(data.href);
            }} className="relative group overflow-hidden" key={index}>
              <motion.div
                className="flex items-center justify-center"
                custom={index}
                variants={slide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <motion.div
                  variants={arrowSlide}
                  animate={selectedIndicator === data.href ? "open" : "closed"}
                  className="h-1 w-1/3 max-w-80 bg-secondary rounded-full origin-left absolute"
                ></motion.div>
                <span
                  className="absolute inset-0 -z-10 transition-all duration-500 ease-in-out group-hover:scale-y-100 group-hover:origin-center scale-y-0 origin-center bg-[#987654]"
                />
                <LinkButton className="no-underline pb-3 font-bold w-fit leading-[clamp(3rem,7vw,4.5rem)] text-[clamp(3.25rem,9.5vw,6rem)]" to={data.href}>{data.title}</LinkButton>
              </motion.div>
            </div>
          ))}
        </div>
        <ul className="flex w-full sm:px-12 sm:justify-between justify-center sm:w-fit text-body-sm gap-6 sm:gap-0">
          {socialLinks.map((link, index) => (
            <Magnetic key={index}>
              <li data-strength="1" className="flex justify-center items-center px-[clamp(3px,3vw,16px)] p-2 w-[8%] xs:w-16 md:w-24">
                <a href={link.href} target="_blank" rel="noreferrer">
                  <link.icon className="size-[clamp(24px,10vw,48px)] xs:size-8" />
                  <span></span> {/* In here just to allow magnetic to work */}
                </a>
              </li>
            </Magnetic>
          ))}
        </ul>
      </div>
      <svg className="absolute left-0 -bottom-[150px] h-[155px] w-full stroke-none fill-[var(--background-nav)]">
        <motion.path
          variants={curve}
          custom={size}
          initial="initial"
          animate="enter"
          exit="exit"
        ></motion.path>
      </svg>
    </motion.div>
  );
}
