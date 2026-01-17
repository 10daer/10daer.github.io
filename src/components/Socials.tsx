import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RiArrowUpWideFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts";
import { socialLinks } from "../data-station";
import Magnetic from "./Magnetic";


export default function Socials() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation()
  const { contactIsInView, isMobile, handleContactInView } = useGlobalContext();

  useEffect(() => {
    handleContactInView(false)
  }, [pathname])

  useEffect(() => {
    setIsOpen(contactIsInView);
    const social = document.querySelector(".socials") as HTMLElement
    if (contactIsInView) {
      social.style.backgroundColor = "transparent";
    } else {
      social.style.backgroundColor = "#3d2814";
    }
  }, [contactIsInView]);

  useEffect(() => {
    const handleScreenClick = (e: Event) => {
      if (isOpen && !(e.target as HTMLElement)?.closest(".socials") && !contactIsInView) setIsOpen(false)
    }

    document.addEventListener("click", handleScreenClick)

    return () => {
      document.removeEventListener("click", handleScreenClick)
    }
  }, [isOpen, contactIsInView])

  return (
    <motion.div
      onMouseLeave={() => {
        if (contactIsInView) return
        setIsOpen(false)
      }}
      onMouseEnter={() => {
        if (contactIsInView) return
        setIsOpen(true)
      }}
      className={`group socials secondary py-1 overflow-hidden z-30 mx-auto shadow-sm w-full text-center text-secondary-400 rounded-lg `}
      style={{
        position: `${contactIsInView ? "fixed" : "sticky"}`,
        left: `${contactIsInView ? (window.innerWidth > 780 ? "60%" : (window.innerWidth < 480 ? "1.5rem" : "2rem")) : ""}`,
        bottom: `${contactIsInView ? (window.innerWidth > 780 ? "2.5rem" : (window.innerWidth < 480 ? "15vh" : "6.5rem")) : "1rem"}`,
        willChange: "width position",
        transformOrigin: `${contactIsInView ? "bottom right" : "bottom"}`,
        minWidth: `${isOpen && !isMobile && "14rem" || "fit-content"}`,
      }}
      animate={{
        width: isOpen ? `${isMobile ? "60%" : "20%"}` : "fit-content",
        height: isOpen ? "auto" : "fit-content",
      }}
      transition={{ type: "spring", stiffness: 800, damping: 30, }}
    >
      <ul
        className={`${isOpen ? "flex" : "hidden"} py-2 ${contactIsInView ? "origin-bottom-right" : "origin-bottom"} transition-[display] duration-1000 ease-out overflow-hidden gap-0 justify-center items-center xs:py-1`}
      >
        {socialLinks.map((link, index) => (
          <Magnetic key={index}>
            <li className="flex justify-center items-center w-12 md:w-16">
              <a href={link.href} target="_blank" rel="noreferrer">
                <link.icon size={28} />
                <span></span> {/* In here just to allow magnetic to work */}
              </a>
            </li>
          </Magnetic>
        ))}
      </ul>

      <button
        className={`${!isOpen ? "block px-5" : "hidden"}`}
        onClick={() => setIsOpen(true)}
      >
        <RiArrowUpWideFill size={24} />
      </button>
    </motion.div>
  );
}
