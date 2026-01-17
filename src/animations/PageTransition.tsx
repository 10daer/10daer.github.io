import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { animateFn } from ".";
import { useGlobalContext } from "../contexts";
import { IPageTransition } from "./types";

type customAnimationDefinition = {
  opacity?: number | string
}

export default function PageTransition({ children, words: wordsProp }: IPageTransition) {
  const [index, setIndex] = useState(0);
  const { isLoading, setLoading, routeWord, setWord } = useGlobalContext()
  const words = routeWord.length ? routeWord : wordsProp
  const delay = words[0] === " " ? 1500 : 500
  const duration = ((words.length - 1) * 500 + delay) / 1000

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    if (index == words.length - 1) return;

    let animationFrameId: number;
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const delay = index == 0 && words[index] === " " ? 750 : 500

      if (elapsed >= delay) {
        setIndex(index + 1)
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      scrollTo(0, 0)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    };
  }, [index, isLoading, words]);

  const opacity = {
    initial: {
      opacity: 1,
      zIndex: 50,
    },
    enter: {
      opacity: 0,
      transition: { duration: 0.8, delay: duration, ease: [0.76, 0, 0.24, 1], }, transitionEnd: { zIndex: -10, }
    },
    exit: {
      opacity: 0,
      zIndex: 50,
      transition: { duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <>
      <div className="page-transition">
        <motion.p
          {...animateFn(opacity)}
          className="flex text-white h-screen w-screen text-4xl top-0 left-0 justify-center items-center fixed z-[50]"
        >
          {words[index]}
        </motion.p>
        <motion.svg
          className="fixed h-screen w-screen top-0 left-0 z-40 inset-0 pointer-events-none"
          initial={{ opacity: 1, zIndex: 40 }}
          animate={{
            opacity: 0,
            zIndex: -10,
            transition: {
              duration: 0.25,
              ease: [0.76, 0, 0.24, 1],
              delay: duration + 1,
            },
          }}
          exit={{
            opacity: 1,
            zIndex: 40,
            transition: {
              duration: 0,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          onAnimationComplete={(definition: customAnimationDefinition) => {
            const { opacity } = definition
            if (opacity !== 0) return
            setLoading(false)
            setWord([])
          }}
          width="100%"
          height="100%"
        >
          <defs>
            <filter id="turbulence-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.03"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            <mask id="revealMask">
              <rect width="100%" height="100%" fill="white" />
              <motion.circle
                cx="50%"
                cy="50%"
                r="0"
                initial={{ r: "0%" }}
                animate={{
                  r: "150%",
                  transition: {
                    duration: 2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: duration,
                  },
                }}
                exit={{
                  r: "0%",
                  transition: {
                    duration: 1.5,
                    ease: [0.76, 0, 0.24, 1],
                  },
                }}
                fill="black"
                filter="url(#turbulence-filter)"
              />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="#181A1F"
            mask="url(#revealMask)"
          />
        </motion.svg>
      </div>

      {children}
    </>
  );
}
