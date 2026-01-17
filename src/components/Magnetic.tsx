import gsap from "gsap";
import { cloneElement, ReactElement, useEffect, useRef } from "react";
import { useGlobalContext } from "../contexts";

interface MagneticProps {
  children: ReactElement;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLElement | null>(null);
  const text = useRef<HTMLSpanElement | null>(null);
  const { handleAddToMagnetsRefs } = useGlobalContext()

  useEffect(() => {
    const element = magnetic.current;
    text.current = element?.querySelector("span") || null
    const elementStrength = Number(element?.dataset.strength) || 0.6;
    const textStrength = Number(text && text.current?.dataset.strength) || 0.3;

    if (!element || !text.current) return;

    if (!element.querySelector("stickyElement")) handleAddToMagnetsRefs(element)

    const xTo = gsap.quickTo(element, "x", {
      rotate: "0.001deg",
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      rotate: "0.001deg",
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });

    const xTextTo = gsap.quickTo(text.current, "x", {
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
    const yTextTo = gsap.quickTo(text.current, "y", {
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * elementStrength);
      yTo(y * elementStrength);
      xTextTo(x * textStrength);
      yTextTo(y * textStrength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      xTextTo(0);
      yTextTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleAddToMagnetsRefs]);

  return cloneElement(children, { ref: magnetic });
}
