import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef } from "react";
import SplitType from "split-type";
import { useGlobalContext } from "../contexts";
import { AnimatableHTMLElement, AnimationEffect } from "./types";

gsap.registerPlugin(ScrollTrigger);

export default function Logo() {
  const isInitiated = useRef(false)
  const scrollTriggerInstanceArr = useRef<ScrollTrigger[]>([])
  const { sectionRefs, handleContactInView, isLoading } = useGlobalContext();
  const logoRef = useRef<AnimatableHTMLElement>(null);

  const defaultAnimationProps: gsap.TweenVars = useMemo(() => {
    return {
      duration: 0.5,
      ease: "cubic-bezier(0.76, 0, 0.24, 1)",
    };
  }, []);

  const { originalHTMLContent, originalStyles } = useMemo(() => {
    return {
      originalHTMLContent: new Map<HTMLElement, string>(),
      originalStyles: new Map<HTMLElement, string>(),
    }
  }, [])

  useEffect(() => {
    const logoEl = logoRef.current
    const sections = sectionRefs.current

    if (!logoEl) return;

    if (!originalHTMLContent.get(logoEl) || !originalStyles.get(logoEl)) {
      originalHTMLContent.set(logoEl, logoEl.innerHTML);
      originalStyles.set(
        logoEl,
        logoEl.getAttribute("style") || ""
      );
    }

    const effects: AnimationEffect[] = [

      {
        offsetStartAmount: -10,
        offsetEndAmount: 10,
        onEnter: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          resetElement(target);
          gsap.set(target, { transformOrigin: "50% 50%" });
          target.currentTween = gsap.to(target, {
            yPercent: -200,
            ...defaultAnimationProps,
            onComplete: () => {
              target.currentTween = null;
            },
          });
        },
        onLeave: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          target.currentTween = gsap.to(target, {
            startAt: { yPercent: -200 },
            yPercent: 0,
            ...defaultAnimationProps,
            onComplete: () => {
              resetElement(target);
              target.currentTween = null;
            },
          });
        },
      },


      {
        offsetStartAmount: 30,
        offsetEndAmount: 10,
        onEnter: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          resetElement(target);
          target.textSplitter = new SplitType(target, { types: "chars" });
          const chars = target.textSplitter.chars || [];
          target.currentTween = gsap.to(chars, {
            x: () => gsap.utils.random(-50, 50),
            y: () => gsap.utils.random(-40, 0),
            autoAlpha: 0,
            stagger: {
              amount: 0.02,
              from: "random",
            },
            duration: 0.4,
            ease: "cubic-bezier(0.76, 0, 0.24, 1)",
            onComplete: () => {
              target.currentTween = null;
            },
          });
        },
        onLeave: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          const chars = target.textSplitter?.chars || [];
          target.currentTween = gsap.to(chars, {
            x: 0,
            y: 0,
            autoAlpha: 1,
            stagger: {
              amount: 0.03,
              from: "random",
            },
            onComplete: () => {
              target.innerHTML = originalHTMLContent.get(target) as string;
              resetElement(target);
              target.currentTween = null;
            },
            ...defaultAnimationProps,
          });
        },
      },


      {
        offsetStartAmount: 90,
        offsetEndAmount: 40,
        onEnter: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          resetElement(target);
          gsap.set(target, { transformOrigin: "25% 100%" });
          target.currentTween = gsap.to(target, {
            xPercent: 10,
            rotation: -90,
            opacity: 0.3,
            y: () => (target.offsetWidth - target.offsetHeight) * 0.75,
            ...defaultAnimationProps,
            onComplete: () => {
              target.currentTween = null;
            },
          });
        },
        onLeave: (target: AnimatableHTMLElement) => {
          if (target.currentTween) target.currentTween.kill();
          target.currentTween = gsap.to(target, {
            rotation: 0,
            xPercent: 0,
            opacity: 1,
            y: 0,
            ...defaultAnimationProps,
            onComplete: () => {
              resetElement(target);
              target.currentTween = null;
            },
          });
        },
      },
    ];

    function resetElement(target: AnimatableHTMLElement | null) {
      if (!target) return

      target.innerHTML = originalHTMLContent.get(target) as string;

      gsap.set(target, {
        clearProps: "all",
        rotation: 0,
        xPercent: 0,
        yPercent: 0,
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        autoAlpha: 1,
      });

      target?.setAttribute("style", originalStyles.get(target) as string);
    }

    function getElementTopOffset(element: AnimatableHTMLElement | null) {
      const elementRect = element?.getBoundingClientRect();
      return elementRect?.top ?? 24;
    }

    function destroyAnimation() {
      scrollTriggerInstanceArr.current.forEach(trigger => trigger.kill());

      if (logoEl?.currentTween) {
        logoEl.currentTween.kill();
        logoEl.currentTween = null;
      }

      resetElement(logoEl);
      isInitiated.current = false
    }

    function createScrollTriggers() {
      scrollTriggerInstanceArr.current = []

      sections.forEach((section) => {
        const index =
          Number(section?.dataset.index) >= effects.length
            ? 0
            : Number(section?.dataset.index);
        const effect = effects[index];
        const elementOffsetTop = getElementTopOffset(logoEl);

        if (!section) return

        const sectionScroll = ScrollTrigger.create({
          trigger: section,
          start: () => `top ${elementOffsetTop + effect.offsetStartAmount}px`,
          end: () => `bottom ${elementOffsetTop + effect.offsetEndAmount}px`,

          onEnter: () => {
            if (logoEl && section) return effect.onEnter(logoEl);
          },
          onLeaveBack: () => {
            if (logoEl && section) return effect.onLeave(logoEl);
          },
          onLeave: () => {
            if (logoEl && section) return effect.onLeave(logoEl);
          },
          onEnterBack: () => {
            if (logoEl && section) return effect.onEnter(logoEl);
          },
        });

        scrollTriggerInstanceArr.current.push(sectionScroll)
      });

      const triggerElement =
        document.querySelector(".trigger");

      const footerScroll = ScrollTrigger.create({
        trigger: triggerElement,
        start: `bottom ${window.innerWidth > 780 ? "bottom-=4%" : "bottom-=16%"}`,
        end: "bottom top-=5%",
        onEnter: () => {
          handleContactInView(true);
        },
        onLeaveBack: () => {
          handleContactInView(false);
        },
      });

      scrollTriggerInstanceArr.current.push(footerScroll)
      isInitiated.current = true
    }

    if (!isLoading && !isInitiated.current) {
      createScrollTriggers();
    }

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", () => {
        ScrollTrigger.refresh();
      });

      scrollTriggerInstanceArr.current.forEach(trigger => {
        if (!trigger.isActive || (isLoading && scrollTriggerInstanceArr.current.length !== 0)) {
          destroyAnimation()
          return
        }
      });
    };
  }, [handleContactInView, originalHTMLContent, originalStyles, isLoading, sectionRefs, defaultAnimationProps]);

  return (
    <div
      ref={logoRef}
      style={{ fontKerning: "none" }}
      className="fixed text-logo-text font-extrabold top-4 z-[2] left-5 sm:left-10 xl:left-20 2xl:left-28 text-3xl uppercase leading-tight"
    >
      <span className="font-neueMontrealBold ">10</span>
      <span className="font-grotesk text-2xl font-bold">daer</span>
    </div>
  );
}