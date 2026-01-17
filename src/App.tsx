import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Preloader } from "./components";
import { GlobalProvider } from "./contexts";
import { preloadAssets } from "./utils/assetsLoader";

const createDelayedComponent = (importFn: () => any) => {
  return lazy(async () => {
    // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // await delay(10000)
      await preloadAssets();
      const component = await importFn();
      return component;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  });
};

const AnimatedRoute = createDelayedComponent(() => import('./components/AnimatedRoute'));

function App() {
  const words = document.querySelectorAll('.preloader span') as NodeListOf<HTMLSpanElement>;
  words.forEach(word => { if (word?.style && word.style?.display) word.style.display = "none" })

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, duration: 1.5 });

    lenis.on("scroll", () => ScrollTrigger.update());

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <AnimatedRoute />
        </Suspense>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;

