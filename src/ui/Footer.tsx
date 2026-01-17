import { FaMapPin } from "react-icons/fa";
import { Magnetic, RoundedButton, Time } from "../components";

export default function Footer() {
    return (
        <footer id="footer" className="bg-[#3d2814] h-screen w-full relative max-w-[100vw] text-secondary" style={{ clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)" }}>
            <div className="relative h-[200vh] -top-[100vh]">
                <div className="md:pt-10 py-6 flex flex-col justify-between pb-4 sticky top-0 h-screen pt-[clamp(4rem,16vh,10rem)] xxs:pt-40 xs:pt-24 md:px-12 xl:px-24 2xl:px-32 px-6 bg-[#3d2814]">
                    <div className="w-full mx-auto xs:max-w-[86%] lg:max-w-[76%]">
                        <div className="w-full text-secondary text-[clamp(2rem,7vw,4rem)] leading-[0.8] xxs:text-h2 md:pt-12">
                            <span className="flex gap-2 justify-start items-center md:gap-6">
                                <div className="size-12 border-red-100 rounded-full border md:size-16"></div>
                                <span>Let's build the best</span>
                            </span>
                            <span>product together</span>
                        </div>

                        <div className="w-full pt-3 xxs:pt-12 xs:pt-0">
                            <div className="block pt-[70px] xs:pt-14 relative">
                                <div className="w-full block h-px bg-secondary-200"></div>
                                <Magnetic>
                                    <div data-strength="0.8" className="magnet rounded-full overflow-hidden grid right-4 size-[clamp(7rem,22vw,9rem)] bg-secondary-600 text-base place-content-center absolute top-3 xs:-top-4 xs:right-[5%] md:right-[8%] sm:text-lg"><span data-strength="0.4">Contact Me</span></div>
                                </Magnetic>
                            </div>
                        </div>

                        <div className="flex pt-[12.5vh] flex-col justify-start items-start text-[1.2rem] w-full gap-4 md:gap-6 lg:gap-12 lg:flex-row xxs:pt-[10vh] xs:pt-12 lg:pt-20">
                            <RoundedButton strength={0.4} backgroundColor="#987654" styles="w-full rounded-full p-[clamp(10px,3vw,24px)] border border-secondary-200 xxs:py-5 xs:p-3 xs:w-3/5 md:w-fit md:p-4 md:px-16">
                                <span className="z-10">+234 70 6574 7990</span>
                            </RoundedButton>

                            <RoundedButton strength={0.3} backgroundColor="#987654" styles="w-full rounded-full p-[clamp(10px,3vw,24px)] border border-secondary-200 xxs:py-5 xs:p-3 xs:w-3/5 md:w-fit md:p-4 md:px-12">
                                <span data-strength="0.2" className="z-10">afolabireadwan@gmail.com</span>
                            </RoundedButton>
                        </div>
                    </div>

                    <div className="flex h-fit flex-col max-h-[28vh] justify-self-end lg:max-h-[24vh] justify-end xxs:gap-8 gap-4 md:justify-evenly xs:pt-4 md:pt-0 md:pb-3 md:flex-row-reverse md:items-end">
                        <div className="w-full mb-2 h-14 border-b border-secondary-200 xs:mb-8 md:mb-2 md:w-2/5" />

                        <div className="text-footer flex justify-between pb-4 xxs:pb-6 md:pb-0 items-end xs:leading-[0.8] md:w-2/5 md:gap-16 md:justify-start md:mb-2">
                            <div className="flex flex-col justify-end items-stretch gap-2 xs:gap-1">
                                <span className="opacity-50 pl-1">Location</span>
                                <p className="flex justify-center items-end">
                                    <FaMapPin size={20} /> <span>Osun, Nigeria</span>
                                </p>
                            </div>
                            <div className="flex gap-0 flex-col justify-start items-stretch">
                                <span className="opacity-50">Local Time</span>
                                <Time />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
