import { MenuBar, RoundedButton, Time } from "../components";
import { IAnimRoute } from "../components/types";

export default function ContactMe({ isActive, setNavIsActive }: IAnimRoute) {
  return (
    <footer id="contact"
      className="relative px-6 md:px-12 xl:px-24 bg-accent-400 h-screen"
      style={{ clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)" }}
    >
      <div className=" relative h-[200vh] -top-[100vh]">
        <div className="text-white md:pt-10 py-6 flex flex-col justify-start pt-[4.5rem] pb-4 sticky top-0 h-screen">

          <MenuBar isActive={isActive} setNavIsActive={setNavIsActive} />
          <h2 className="mb-4 text-center leading-[0.8] font-bold text-7xl">
            Contact
          </h2>
          <div className="contents md:grid gap-20 place-items-start grid-cols-6">
            <div className="col-span-4 md:content-start">
              <h3 className="max-w-lg 2xl:max-w-3xl text-body-xl 2xl:text-7xl font-semibold leading-tight">
                Have an awesome idea? Let&apos;s bring it to life.
              </h3>
              <p className="mt-4 max-w-md 2xl:max-w-2xl text-body-lg 2xl:text-4xl text-accent-100">
                I am currently not available for freelance work. I am accepting new projects starting from February 2022.
              </p>
              <form
                name="contact"
                action="/contact"
                autoComplete="off"
                className="mt-2 text-2xl grid grid-cols-1 gap-6"
                method="POST"
              >
                <div className="relative z-0">
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="peer block w-full appearance-none border-0 border-b b bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-md duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                  >
                    Your name
                  </label>
                </div>
                <div className="relative z-0">
                  <input
                    required
                    type="text"
                    name="email"
                    id="email"
                    className="peer block w-full appearance-none border-0 border-b b bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-md duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                  >
                    Your email
                  </label>
                </div>
                <div className="relative z-0 sm:col-span-2">
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    className="peer block w-full appearance-none border-0 border-b b bg-transparent px-0 py-2.5 focus:outline-none focus:ring-0"
                    placeholder=" "
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-body-md duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 2xl:text-body-2"
                  >
                    Your message
                  </label>
                </div>
                <div className="my-4 w-full md:justify-items-start justify-items-end">
                  <RoundedButton
                    styles="p-4 z-10 hover:bg-transparent hover:text-primary-200"
                    type="submit"
                    backgroundColor="#666666"
                  >
                    Send Message
                  </RoundedButton>
                </div>
              </form>
            </div>
            <div className="space-y-2 md:pt-40 col-span-2 grid grid-rows-[0.5fr_3rem_1fr] w-full">
              <div className="flex flex-col text-2xl space-y-1 items-start justify-center">
                <a
                  href="mailto:afolabireedwan@gmail.com"
                  className="group relative w-fit"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>afolabireedwan@gmail.com</span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full  duration-300 ease-in-out group-hover:w-full"></span>
                </a>
                <a
                  href="+2347065747990"
                  className="group relative w-fit"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>
                    {/* <img
                      src={countryFlag}
                      alt="Country flag"
                      className="h-5 rounded-sm"
                    /> */}
                    706 5747 990
                  </span>
                  <span className="absolute bottom-0 left-0 h-[0.12em] w-0 rounded-full  duration-300 ease-in-out group-hover:w-full"></span>
                </a>
              </div>
              <div className="-z-20"></div>
              <div className="text-xl">
                <p className="text-5xl">
                  Osun, Nigeria <br></br>
                </p>
                <Time />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
