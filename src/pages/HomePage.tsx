import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { PageTransition } from "../animations";
import { Cursor } from "../components";
import { INavActivity } from "../components/types";
import { About, Footer, Hero, Role, Services, Works } from "../ui";

gsap.registerPlugin(ScrollTrigger)

export default function Home({ isActive, setNavIsActive }: INavActivity) {
  const words = [" ", "Welcome", "To My", "Portfolio"]
  const fired = useRef(false)
  const mobile = window.innerWidth <= 460
  const scrollTriggerInstanceArr = useRef<ScrollTrigger[]>([])


  useEffect(() => {
    const sections = document.querySelectorAll("section")
    scrollTriggerInstanceArr.current = []

    sections.forEach((section) => {
      const id = section.getAttribute("id") as string

      if (!["works", "my-services"].includes(id)) return

      const sectionScroll = ScrollTrigger.create({
        trigger: section,
        start: `start ${mobile ? "50%" : "75%"}`,
        end: `bottom ${mobile ? "50%" : "40%"}`,
        onLeave: () => {
          if (id === "works") ScrollTrigger.refresh();
        },
        onUpdate: (e) => {
          if (e.trigger?.getAttribute("id") === "my-services" && !fired.current) {
            e.refresh()
            ScrollTrigger.getAll().forEach(trigger => trigger.refresh());
            fired.current = true
          }
        },
        animation: gsap
          .timeline()
          .to(":root", { "--background-secondary": "#0E0E0C", "--text-logo": "#DDDDD5", "--background-nav": "#D1D1C7", "--text-nav": "#0E0E0C" }, 0),

        toggleActions: "restart reverse restart reverse",
      });

      scrollTriggerInstanceArr.current.push(sectionScroll)
    });

    document.querySelectorAll(".head")?.forEach(h2 => h2.addEventListener("click", () => fired.current = false))

    return () => {
      document.querySelectorAll(".head")?.forEach(h2 => h2.removeEventListener("click", () => fired.current = false))
      scrollTriggerInstanceArr.current.forEach(trigger => trigger.kill())
      gsap.set(":root", { "--background-secondary": "#fafaf9", "--background-nav": "#262626", "--text-nav": "#D1D1C7", "--text-logo": "#0E0E0C" })
    }
  }, [mobile])

  return (
    <PageTransition words={words} >
      <Hero isActive={isActive} setNavIsActive={setNavIsActive} />
      <Role />
      <Works />
      <About />
      <Services />
      <Footer />
      <Cursor />
    </PageTransition>
  );
}
