import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ForwardedRefWrapper from "./ForwardedRefWrapper";

export default function ProjectTitle({ title }: { title: string }) {
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const slider = useRef<HTMLDivElement | null>(null);
  const xPercent = useRef(0);
  const direction = useRef<number>(-1);
  const words = (title as string).split(",");
  const [startScroll, setStartScroll] = useState(false);

  const addRef = (ref: HTMLParagraphElement | null) => {
    if (ref && !textRefs.current.includes(ref)) textRefs.current.push(ref);
  };

  const animate = useCallback(() => {
    if (xPercent.current < -100) {
      xPercent.current = 0;
    } else if (xPercent.current > 0) {
      xPercent.current = -100;
    }
    textRefs.current.map((ref) =>
      gsap.set(ref, { xPercent: xPercent.current })
    );
    requestAnimationFrame(animate);
    if (startScroll) xPercent.current += 0.25 * direction.current;
  }, [startScroll]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!slider.current || textRefs.current.length === 0) return;

    const firstText = textRefs.current[0]?.querySelectorAll("span");

    firstText?.forEach((span: HTMLSpanElement, index: number) => {
      if (index < 2) {
        gsap.fromTo(span, { y: `${((index + 1) * 2 - 3) * 50}px` }, {
          y: 0, duration: 1,
        });
      }
    });

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction.current = e.direction * -1),
      },
      x: "-0px",
    });

    setStartScroll(true);

    requestAnimationFrame(animate);

    return () => {
      ScrollTrigger.killAll();
    };
  }, [animate]);

  return (
    <span
      ref={slider}
      className="relative pb-6 overflow-hidden pt-0 w-full flex whitespace-nowrap"
    >
      {words.map((word: string, index: number) => (
        <ForwardedRefWrapper
          key={index}
          as="span"
          className="first-of-type:pl-0 py-0 relative m-0 flex justify-center items-center gap-4 px-4"
          ref={addRef}
        >
          {word.split(" ").map((el, index) => (
            <span key={index}>{el}</span>
          ))}
          {index + 1 < words.length && <span className="pl-4">-</span>}
        </ForwardedRefWrapper>
      ))}
    </span>
  );
}
