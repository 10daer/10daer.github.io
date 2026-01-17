export const descriptionSlideUp = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const descriptionOpacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export const detailSlideUp = {
  initial: {
    y: "100%",
  },
  open: (i: number) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

export const headingSlideUp = {
  hidden: {
    rotateX: 90,
    opacity: 0,
    y: "100%",
    scale: 0.8,
    transformOrigin: "top",
  },
  visible: (i: number) => ({
    rotateX: 0,
    opacity: 1,
    scale: 1,
    y: "0%",
    transformOrigin: "bottom",
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export const lineReveal = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: "100%",
    opacity: 1,
    transition: {
      duration: 1.5,
      delay: 0.4,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

export const skillSlide = {
  open: { opacity: 1, height: "auto" },
  collapsed: { opacity: 0, height: 0 },
  transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
};
