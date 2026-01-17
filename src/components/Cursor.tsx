

import {
  animate,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../contexts";
import { IMotionVal, IPosition, SmoothOptions } from "../hooks/types";


export default function Cursor() {
  const isTouchScreen = window.matchMedia("(pointer:coarse)").matches
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true);
  const [showSvg, setShowSvg] = useState<boolean>(false);
  const cursor = useRef<HTMLDivElement | null>(null);
  const { projectsRefs } = useGlobalContext();
  const stickyElement = useRef<HTMLElement | null>(null);
  const cursorSize = isHovered ? 60 : 12;

  const mouse: IMotionVal = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const scale: IMotionVal = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const smoothOptions: SmoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const rotate = (distance: IPosition): void => {
    const angle = Math.atan2(distance.y, distance.x);
    if (cursor.current) {
      animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
    }
  };

  const manageMouseMove = (e: MouseEvent): void => {
    const { clientX, clientY } = e;

    if (!stickyElement.current) return;

    const { left, top, height, width } = stickyElement.current.getBoundingClientRect();
    const center = { x: left + width / 2, y: top + height / 2 };

    if (isHovered) {
      const distance: IPosition = { x: clientX - center.x, y: clientY - center.y };

      rotate(distance);

      const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y));
      const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);
      const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);
      scale.x.set(newScaleX);
      scale.y.set(newScaleY);

      mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
      mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
    } else {
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  };

  const manageMouseOver = (): void => {
    setIsHovered(true);
  };

  const manageMouseLeave = (): void => {
    setIsHovered(false);
    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.1, type: "spring" },
      );
    }
  };

  const manageProjectEnter = (): void => {
    setShowSvg(true);
    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 9, scaleY: 9 },
        { duration: 0.3, type: "spring" },
      );
    }
  };

  const manageProjectLeave = (): void => {
    setShowSvg(false);
    if (cursor.current) {
      animate(
        cursor.current,
        { scaleX: 1, scaleY: 1 },
        { duration: 0.3, type: "spring" },
      );
    }
  };

  const manageMaskEnter = (): void => setHide(true);
  const manageMaskLeave = (): void => setHide(false);

  useEffect(() => {
    const projects = projectsRefs.current;
    const masks = document.querySelectorAll<HTMLElement>(".mask");
    const sticky = document.querySelector<HTMLElement>(".stickyElement");

    if (!sticky) return;

    stickyElement.current = sticky;

    const handleMouseMove = (e: MouseEvent) => manageMouseMove(e);

    sticky.addEventListener("mouseenter", manageMouseOver);
    sticky.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    masks.forEach(mask => {
      mask.addEventListener("mouseenter", manageMaskEnter);
      mask.addEventListener("mouseleave", manageMaskLeave);
    });

    if (projects) {
      projects.forEach((project) => {
        project?.addEventListener("mouseenter", manageProjectEnter);
        project?.addEventListener("mouseleave", manageProjectLeave);
      });
    }

    return () => {
      sticky.removeEventListener("mouseenter", manageMouseOver);
      sticky.removeEventListener("mouseleave", manageMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);

      if (projects) {
        projects.forEach((project) => {
          project?.removeEventListener("mouseenter", manageProjectEnter);
          project?.removeEventListener("mouseleave", manageProjectLeave);
        });
      }

      masks.forEach(mask => {
        mask.removeEventListener("mouseenter", manageMaskEnter);
        mask.removeEventListener("mouseleave", manageMaskLeave);
      });
    };
  }, [isHovered]);

  const template = ({ rotate, scaleX, scaleY }: {
    rotate: string | number;
    scaleX: number;
    scaleY: number;
  }): string => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <motion.div
      transformTemplate={template}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      animate={{
        width: cursorSize,
        height: cursorSize,
      }}
      className={`pointer-events-none ${hide ? "opacity-0" : "opacity-100"} fixed left-1/2 top-1/2 size-3 items-center justify-center rounded-full bg-secondary-600 rotate-0 scale-100 ${showSvg ? "p-1" : ""} ${isTouchScreen ? "hidden" : "hidden sm:flex"} will-change-auto z-[34] origin-center`}
      ref={cursor}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${showSvg ? "scale-100" : "scale-0"}`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M6 19L19 6m0 0v12.48M19 6H6.52"
        />
      </svg>
    </motion.div>
  );
}

