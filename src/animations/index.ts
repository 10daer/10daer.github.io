import { Variants } from "framer-motion";

export const animateFn = (variants: Variants, custom = null) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  };
};

import {
  descriptionOpacity,
  descriptionSlideUp,
  detailSlideUp,
  headingSlideUp,
  lineReveal,
  skillSlide,
} from "./descriptionAnim";
import { opacity } from "./loaderAnim";
import { arrowSlide, curve, menuSlide, slide } from "./navAnims";
import PageTransition from "./PageTransition";
import { pageSlideUp } from "./projectDetailAnim";
export {
  arrowSlide,
  curve,
  descriptionOpacity,
  descriptionSlideUp,
  detailSlideUp,
  headingSlideUp,
  lineReveal,
  menuSlide,
  opacity,
  pageSlideUp,
  PageTransition,
  skillSlide,
  slide,
};
