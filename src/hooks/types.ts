import { MotionValue } from "framer-motion";

export interface IPosition {
  x: number;
  y: number;
}

export interface IMotionVal {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export interface SmoothOptions {
  damping: number;
  stiffness: number;
  mass: number;
}
