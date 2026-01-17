import { useInView } from "framer-motion";
import { useRef } from "react";
import { BiArrowToLeft, BiArrowToRight, BiLinkExternal } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { PageTransition } from "../animations";
import { Cursor, LinkButton, MenuBar, ProjectTitle, Socials, TextReveal } from "../components";
import { IAnimRoute } from "../components/types";
import { useGlobalContext } from "../contexts";
import { Footer } from "../ui";
import Loader from "./loader";

export default function ProjectPage({ isActive, setNavIsActive }: IAnimRoute) {
  const { sectionRefs } = useGlobalContext()
  sectionRefs.current = [] // Prevents logo animation
  const { pathname } = useLocation();
  const { src, metadata, description, quote, title, prev, next, } = Loader(pathname);
  const words = title?.split(" ") as [];
  const projectTitle = `${title},${title},${title},${title}`;

  const view = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(view, { once: false, amount: 0.33 })

  return (
    <PageTransition words={words}>
      <section className="h-screen text-accent-400">
        <div style={{ backgroundImage: `url("/${src}")` }} className="px-24 md:px-12 xl:px-24 bg-contain bg-no-repeat bg-center bg-accent-100 2xl:px-32 p-10 py-28 md:p-16 h-screen w-screen">
        </div>

        <MenuBar isActive={isActive} setNavIsActive={setNavIsActive} />

        <h1 className="min-h-32 relative text-accent-400 bottom-[20%] left-0 text-[clamp(8rem,12vw,14rem)] font-semibold leading-none flex items-center md:bottom-1/4">
          <ProjectTitle title={projectTitle} />
        </h1>
      </section>

      <section ref={view} className="flex gap-8 px-6 sm:grid grid-cols-[1fr_15vw_1fr] sm:gap-0 md:px-12 xl:px-24 2xl:px-32 text-accent-400 flex-col justify-center items-start font-medium text-4xl py-10 mx-auto">
        <div className="flex flex-col gap-8 justify-between items-start size-full">
          <h2 className="text-3xl font-black">
            {quote?.split(" ").map((quote: string, index) => <TextReveal font="font-neueMontrealMedium" key={`quote-${index}`} index={index} isInView={isInView} word={quote} />)}
          </h2>

          <div className="flex flex-col w-full justify-end items-start gap-1">
            {Object.entries(metadata || {}).map((projectDetail, index) => (
              <div key={`detail-${index}`} className="flex gap-4 justify-start items-center">
                <h2 className="text-body-lg min-w-20 leading-tight font-semibold">{projectDetail[0]}</h2>
                <h3 className="font-normal w-full flex justify-center items-center gap-2 leading-none text-body-sm">
                  {Array.isArray(projectDetail[1])
                    ? projectDetail[1].map(element => (<Fragment key={element}> <span>{element}</span> <span className="last-of-type:hidden">|</span></Fragment>)) : projectDetail[1]}
                </h3>
              </div>)
            )}

            <div className="flex justify-start gap-2 items-start">
              <h2 className="text-body-lg min-w-20 leading-tight font-semibold">Visit</h2>
              <div className="flex w-fit gap-6 justify-center items-center px-2">
                <BsGithub size={24} />
                <BiLinkExternal size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="size-full"></div>

        <div className="size-full">
          <h2 className="text-3xl h-[3rem] font-bold">Description</h2>
          <p className="font-normal h-[calc(100%-3rem)] gap-12 text-body-lg leading-tight flex flex-col justify-between items-center">
            {description?.split("<br/><br/>").map((text: string, index) =>
              <span key={`text-${index}`}>
                {text.split(" ").map((word: string, index) => <span className="first-of-type:m-0" key={`description-${index}`}> <TextReveal index={index} isInView={isInView} word={word} /></span>)}
              </span>
            )}
          </p>
        </div>
      </section>

      <section className="text-accent-400 trigger px-6 text-3xl w-full h-full flex md:px-12 xl:px-24 2xl:px-32 py-6">
        <LinkButton className={`flex flex-col w-full justify-center cursor-pointer items-start ${next === "" && "w-1/2"}`} disabled={prev === ""} to={prev}>Prev <BiArrowToLeft size={40} /></LinkButton>
        <LinkButton className={`flex flex-col w-full justify-center items-end {prev==="" && "w-1/2"}`} disabled={next === ""} to={next}> Next<BiArrowToRight size={40} /></LinkButton>
      </section>
      <Socials />
      <Footer />
      <Cursor />
    </PageTransition>
  );
}




