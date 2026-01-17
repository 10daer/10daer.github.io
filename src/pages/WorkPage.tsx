import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageTransition } from "../animations";
import { Cursor, ForwardedRefWrapper, MenuBar, Socials } from "../components";
import { IAnimRoute, IProject } from "../components/types";
import { useGlobalContext } from "../contexts";
import { works } from "../data-station";
import { Footer } from "../ui";

export default function WorkPage({ isActive, setNavIsActive }: IAnimRoute) {
    const { sectionRefs } = useGlobalContext()
    sectionRefs.current = []
    return (
        <PageTransition words={["10daer", "Works"]}>
            <section className="h-screen w-full">
                <MenuBar isActive={isActive} setNavIsActive={setNavIsActive} />
            </section>

            <section className="h-full w-full trigger py-12">
                <ul className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 px-[clamp(2rem,8vw,3rem)] sm:px-12 lg:px-20 xl:px-36 2xl:px-44">
                    {works.map((work, index) => (
                        <Project
                            work={work}
                            index={index}
                            key={`work_${index}`}
                        />
                    ))}
                </ul>
            </section>
            <Socials />
            <Footer />
            <Cursor />
        </PageTransition>
    )
}


function Project({ index, work }: IProject) {
    const { src, title, projectId } = work;
    const project = useRef(null)
    const { scrollYProgress } = useScroll({
        target: project,
        offset: ["start 0.75", "end end"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
    const { setLoading, handleAddToProjectsRefs } = useGlobalContext()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    function handleNavigation() {
        const to = `/works/${projectId}`
        if (pathname === to) return
        setLoading(true)
        navigate(to)
    }

    return (
        <ForwardedRefWrapper as="li" ref={handleAddToProjectsRefs} className="h-[80vh] w-full flex justify-center group items-center sticky top-20 sm:relative sm:top-0 sm:h-80 p-2">
            <div ref={project} style={{ "--offset": `${0.25 * index}rem` } as { [key: string]: string | MotionValue<number> }} className="relative size-full top-[calc(var(--offset))] sm:top-0" onClick={handleNavigation}>
                <motion.div className="overflow-hidden grid bg-contain bg-center bg-no-repeat place-content-center group-hover:scale-100 size-full" style={{ scale, backgroundImage: `url("/${src}")` }}>
                </motion.div>

                <div className="absolute bottom-0 right-0 text-black">
                    <div className="flex space-x-2 justify-end">
                        <p className="rounded-full bg-transparent border border-secondary-600 flex justify-center items-center px-4 py-1 sm:py-px 2xl:text-3xl">year</p>
                        <p className="rounded-full bg-transparent border border-secondary-600 flex justify-center items-center px-4 py-1 sm:py-px 2xl:text-3xl">tools</p>
                    </div>
                    <h3 className="text-works-title text-end 2xl:text-5xl font-medium uppercase">
                        {title}
                    </h3>
                    <p className="text-body-2 text-end 2xl:text-4xl font-light">type</p>
                </div>
            </div>
        </ForwardedRefWrapper>
    )
}
