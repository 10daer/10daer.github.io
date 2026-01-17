import { navItems } from "../data-station";
import LinkButton from "./LinkButton";
import Magnetic from "./Magnetic";
import { IAnimRoute } from "./types";

export default function MenuBar({ isActive, setNavIsActive }: IAnimRoute) {
    return (
        <div className="absolute flex z-[1] top-0 text-black py-4 pr-5 md:pr-10 xl:pr-20 2xl:pr-28 justify-end w-full font-light box-border items-center">
            <div className="hidden xs:flex items-center gap-6 justify-center py-2">
                {navItems.map(item => <Magnetic key={item.href}>
                    <div>
                        <LinkButton
                            to={item.href}
                            className="group cursor-pointer font-semibold transition-transform duration-300 ease-in-out hover:scale-125 hover:font-extrabold"
                        >
                            <span>{item.title}</span>
                            <span className="absolute bottom-0 left-1/2 size-[0.125em] -translate-x-1/2 transform rounded-full bg-secondary-700 font-extrabold duration-300 ease-in-out group-hover:w-full"></span>
                        </LinkButton>
                    </div>
                </Magnetic>)}
            </div>

            <div onClick={() => setNavIsActive(!isActive)} className="xs:hidden flex flex-col items-center justify-center text-2xl font-bold pr-2">Menu <span className="animate-pulse bg-black size-2 rounded-full"></span>
            </div>
        </div>
    )
}
