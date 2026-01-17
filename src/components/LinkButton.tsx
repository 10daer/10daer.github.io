import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../contexts";
import { ILinkButton } from "./types";

export default function LinkButton({ children, to, className, disabled }: ILinkButton) {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const { setLoading, setWord } = useGlobalContext()

  function handleNavigation() {
    if (pathname === to) return
    setLoading(true)
    if (to === "/") setWord(["Home"])
    navigate(to)
  }

  return (!disabled && <button className={className} onClick={handleNavigation}>
    {children}
  </button>)
}
