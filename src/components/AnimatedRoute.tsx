import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from ".";
import { AboutPage, ContactMe, ErrorPage, Home, ProjectPage, WorkPage } from "../pages";
import { IAnimRoute } from "./types";

const AnimatedRoute = ({ children, isActive, setNavIsActive }: IAnimRoute) => {
    const location = useLocation();

    return (
        <>
            <Navbar isActive={isActive} setNavIsActive={setNavIsActive} />
            <main
                className={`h-full min-h-screen w-screen bg-secondary`}
            >
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {children}
                    </Routes>
                </AnimatePresence>
            </main>
        </>
    );
};

export default function RouteHandler() {
    const [isActive, setIsActive] = useState(false)
    const setNavIsActive = (val: boolean) => setIsActive(val)

    return (
        <AnimatedRoute isActive={isActive} setNavIsActive={setNavIsActive}>
            <Route path="/" element={<Home isActive={isActive} setNavIsActive={setNavIsActive} />} />
            <Route path="/works/:projectId" element={<ProjectPage isActive={isActive} setNavIsActive={setNavIsActive} />} />
            <Route path="/works" element={<WorkPage isActive={isActive} setNavIsActive={setNavIsActive} />} />
            <Route path="/about" element={<AboutPage isActive={isActive} setNavIsActive={setNavIsActive} />} />
            <Route path="/contact" element={<ContactMe isActive={isActive} setNavIsActive={setNavIsActive} />} />
            <Route path="*" element={<ErrorPage />} />
        </AnimatedRoute>
    )
}
