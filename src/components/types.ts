import { IWork } from "@/data-station/types";
import { MotionValue } from "framer-motion";
import { ElementType, ReactNode } from "react";
import SplitType from "split-type";

export interface IChildren {
  children: ReactNode;
}

export interface INavActivity {
  isActive: boolean;
  setNavIsActive: (val: boolean) => void;
}

export interface IAnimRoute extends INavActivity {
  children?: ReactNode;
}

export interface IRoundedButton extends IChildren {
  backgroundColor?: string;
  [x: string]: string | number | ReactNode | (() => void);
}

export interface IProject {
  index: number;
  work: IWork;
  range?: number[];
  target?: number;
  progress?: MotionValue;
}

export interface AnimationEffect {
  offsetStartAmount: number;
  offsetEndAmount: number;
  onEnter: (target: HTMLDivElement) => void;
  onLeave: (target: HTMLDivElement) => void;
}

export interface AnimatableHTMLElement extends HTMLDivElement {
  currentTween?: gsap.core.Tween | null;
  textSplitter?: SplitType | null;
}

export interface ITextReveal {
  index: number;
  isInView: boolean;
  word: string;
  font?: string;
  dot?: boolean;
  styles?: string;
}

export interface ChildProps<T extends ElementType> {
  as?: T;
  children: ReactNode;
  className: string;
  id?: string;
  data?: string;
}

export interface ISectionHead {
  children: ReactNode;
  id?: string;
  styles?: string;
}

export interface ILinkButton {
  children: ReactNode;
  to: string;
  disabled?: boolean;
  className?: string;
}
