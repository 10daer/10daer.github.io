import gsap from "gsap";
import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";
import { IRoundedButton } from "./types";

export default function RoundedButton({
  children,
  styles, strength,
  backgroundColor = "#987654",
  ...attributes
}: IRoundedButton) {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    if (!circle.current) return;

    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { startAt: { top: "150%" }, top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    if (timeline.current) timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      if (timeline.current) timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <button
        data-strength={strength || 0.6}
        className={`${styles && styles} rounded-full border border-solid border-[rgb(136, 136, 136)] relative flex items-center justify-center`}
        style={{ overflow: "hidden" }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className="w-full h-[150%] absolute rounded-[50%] top-full"
        ></div>
      </button>
    </Magnetic>
  );
}
