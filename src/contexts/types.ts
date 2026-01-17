import { MutableRefObject } from "react";

export interface IGlobals {
  sectionRefs: MutableRefObject<(HTMLElement | null)[]>;
  handleAddToRefs: (ref: HTMLElement | null) => void;
  projectsRefs: MutableRefObject<(HTMLElement | null)[]>;
  handleAddToProjectsRefs: (ref: HTMLElement | null) => void;
  magnetsRefs: MutableRefObject<(HTMLElement | null)[]>;
  handleAddToMagnetsRefs: (ref: HTMLElement | null) => void;
  contactIsInView: boolean;
  handleContactInView: (val: boolean) => void;
  isMobile: boolean;
  isLoading: boolean;
  routeWord: string[];
  setWord: (val: [] | string[]) => void;
  setLoading: (val: boolean) => void;
}
