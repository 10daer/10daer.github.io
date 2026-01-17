import { MotionValue } from "framer-motion";

export interface IHeading {
  slideElProgress: MotionValue;
}

export interface IWord {
  children: string;
  textElProgress: MotionValue;
  slideElProgress: MotionValue;
  range: Array<number>;
}

export interface ICharacter extends IWord {
  step?: number;
}

export interface IService {
  service: string;
  skills: string[];
}

export interface IServiceObj {
  serviceObj: IService;
  setIsActive: (val: number) => void;
  index: number;
  isActive: boolean;
}
