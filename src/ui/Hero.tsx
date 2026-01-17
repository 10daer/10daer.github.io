import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { MenuBar } from "../components";
import { INavActivity } from "../components/types";
import { useGlobalContext } from "../contexts";
import { usePosition } from "../hooks";

export default function Hero({ isActive, setNavIsActive }: INavActivity) {
  const text = useRef<HTMLHeadingElement>(null)
  const { isLoading } = useGlobalContext()
  const { x, y } = usePosition()
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState<boolean>(true)
  const size = isHovered && !animating ? 400 : 12;

  useEffect(() => {
    const feBlur = document.querySelector(`#gooey feGaussianBlur`);
    const feTurbulence = document.querySelector(`#gooey feTurbulence`);
    const feDisplacementMap = document.querySelector(`#gooey feDisplacementMap`);

    if (!feBlur || !feDisplacementMap || !feTurbulence) {
      console.warn(`Filter with ID gooey not found for element`, text.current);
      return;
    }

    (text.current as HTMLElement).style.filter = `url(#gooey)`;
    const primitiveValues = { stdDeviation: "0", scale: "0", baseFrequency: "0" };
    gsap.set(text.current, { opacity: 0, scale: 0.6, });

    const animationTimeline = gsap.timeline({
      defaults: {
        duration: 4,
        ease: 'expo',
      },
      onUpdate: () => {
        feTurbulence.setAttribute('baseFrequency', primitiveValues.baseFrequency);
        feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
        feDisplacementMap.setAttribute('scale', primitiveValues.scale);
      },
      scrollTrigger: {
        trigger: container.current,
        start: 'center top',
        end: "bottom top",
      }
    })
      .to(primitiveValues, {
        startAt: {
          stdDeviation: 20, scale: 100, baseFrequency: 0.1
        },
        stdDeviation: 0,
        scale: 0,
        baseFrequency: 0.05
      }, 0)
      .to(text.current, {
        startAt: {
          opacity: 0,
          scale: 0.6, y: -50
        },
        opacity: 1,
        scale: 1, y: 0,
        onComplete: () => { setAnimating(false) }
      }, 0);

    if (!isLoading) animationTimeline.play()

  }, [isLoading])


  return <section id="hero" style={{ clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)" }}
    className="relative no-select text-accent-300 h-screen">
    <div ref={container} className="relative h-[200vh] top-[0]">
      <div className="sticky top-0 h-screen mask">
        <MenuBar isActive={isActive} setNavIsActive={setNavIsActive} />

        <h1 ref={text} className="h-full text-display-xl opacity-0 scale-0 uppercase m-0">
          <motion.span
            style={{
              maskImage: "url('/mask.svg')",
              maskRepeat: "no-repeat",
              maskSize: "40px",
              WebkitMaskImage: "url('/mask.svg')",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "40px",
            }}
            animate={{
              WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
              WebkitMaskSize: `${size}px`,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            className="h-full bg-secondary-600 z-10 pt-44 sm:pt-[20vh] text-wrap absolute w-full flex items-start justify-center">
            <span className="text-center w-min sm:px-[7.5%] h-fit"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              onTouchStart={() => {
                setIsHovered(true);
              }}
              onTouchCancel={() => {
                setIsHovered(false);
              }}
              onTouchEnd={() => {
                setIsHovered(false);
              }}
            >read01</span>
          </motion.span>
          <span className="h-full pt-44 sm:pt-[20vh] relative w-full flex items-start justify-center">
            <span>10daer</span>
          </span>
        </h1>
        <svg>
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />        <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
    0 1 0 0 0
    1 0 1 0 0
    0 0 0 12 -4" result="goo" />
              <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" seed="2" result="noise" />
              <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement" />
              <feComposite in="SourceGraphic" in2="displacement" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  </section>;
}