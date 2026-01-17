import { useEffect, useRef, useState } from "react";
import { IChildren } from "../components/types";
import { GlobalContext } from "./UseGlobalContext";

function GlobalProvider({ children }: IChildren) {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const projectsRefs = useRef<(HTMLElement | null)[]>([]);
  const magnetsRefs = useRef<(HTMLElement | null)[]>([]);
  const [contactIsInView, setContactIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isLoading, setIsLoading] = useState(false)
  const [routeWord, setWord] = useState<string[]>([])

  const setLoading = (val: boolean) => {
    setIsLoading(val)
  }

  const handleAddToRefs = (ref: HTMLElement | null) => {
    if (ref && !sectionRefs.current.includes(ref))
      sectionRefs.current.push(ref);
  };

  const handleAddToProjectsRefs = (ref: HTMLElement | null) => {
    if (ref && !projectsRefs.current.includes(ref))
      projectsRefs.current.push(ref);
  };

  const handleAddToMagnetsRefs = (ref: HTMLElement | null) => {
    if (ref && !magnetsRefs.current.includes(ref))
      magnetsRefs.current.push(ref);
  };

  const handleContactInView = (val: boolean) => {
    setContactIsInView(val);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 600);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth <= 600);
      });
    };
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        sectionRefs, handleAddToProjectsRefs, projectsRefs, handleAddToMagnetsRefs, magnetsRefs, isLoading, setLoading,
        isMobile, routeWord, setWord,
        contactIsInView,
        handleContactInView,
        handleAddToRefs
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;







