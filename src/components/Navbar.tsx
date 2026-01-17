import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import NavigationSlide from "./NavigationSlide";
import { INavActivity } from "./types";

export default function Navbar({ isActive, setNavIsActive }: INavActivity) {
  const { pathname } = useLocation();
  const button = useRef(null);
  const { isLoading } = useGlobalContext()

  useEffect(() => {
    if (isActive) setNavIsActive(false);
  }, [pathname]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          if (!button.current || isLoading) return
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          if (!button.current || isLoading) return
          gsap.to(
            button.current,
            {
              scale: 0, duration: 0.25, ease: "power1.out", onComplete: () =>
                setNavIsActive(false)
            },
          );
        },
      },
    });

    if (isActive) {
      if (!button.current) return
      gsap.to(button.current, {
        scale: 1,
        duration: 0.25,
        ease: "power1.out",
      });
    } else {
      if (!button.current) return
      gsap.to(button.current, {
        scale: 0, duration: 0.25, ease: "power1.in"
      });
    }
  }, [setNavIsActive, isLoading, isActive]);

  return (
    <header>
      <Logo />

      <div ref={button} className="scale-0 parent fixed p-6 pb-20 pl-20 pt-4 md:pt-2 xl:pr-20 2xl:pr-28 right-0 z-[36]">
        <Magnetic>
          <div
            onClick={() => setNavIsActive(!isActive)}
            data-strength="0.25"
            className="relative outline-none pointer-events-none border-none size-10 sm:size-16 group rounded-full cursor-pointer flex items-center justify-center"
          >
            <div
              className={`text-4xl z-[36] p-0 sm:p-4 size-full flex flex-col justify-center gap-1 items-end group-hover:text-white`}
            >
              <span></span> {/* So that magnetic can work  */}
              <div
                className={`h-1 rounded-full group-hover:bg-white w-full transform transition-all duration-500 ease-in-out ${isActive ? "-rotate-45 bg-white translate-y-2" : "bg-nav-background text-nav-text"}`}></div>
              <div
                className={`h-1 rounded-full group-hover:bg-white w-3/4 transform transition-all duration-500 ease-in-out ${isActive ? "opacity-0 bg-white" : "opacity-100 bg-nav-background text-nav-text"}`}></div>
              <div
                className={`h-1 rounded-full group-hover:bg-white w-1/2 transform transition-all duration-500 ease-in-out ${isActive ? "rotate-45 w-full bg-white -translate-y-2" : "bg-nav-background text-nav-text"}`}></div>
            </div>
            <div className="absolute pointer-events-auto left-0 top-0 hover:scale-[3.25] size-full stickyElement"></div>
          </div>
        </Magnetic>
      </div>
      <AnimatePresence mode="wait">{isActive && <NavigationSlide />}</AnimatePresence>
    </header>
  );
}