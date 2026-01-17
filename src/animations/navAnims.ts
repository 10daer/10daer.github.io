export const menuSlide = {
  initial: { y: "calc(-100% - 150px)" },
  enter: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    y: "calc(-100% - 150px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export const slide = {
  initial: { y: -80 },
  enter: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1 * i,
    },
  }),
  exit: (i: number) => ({
    y: -80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

export const arrowSlide = {
  open: { width: "50%", opacity: 1, transition: { duration: 0.3 } },
  closed: { width: 0, opacity: 0, transition: { duration: 0.4 } },
};

export const curve = {
  initial: ({ x, y }: { x: number; y: number }) => ({
    d: `M0 0 L${x} 0 L${x} 0 C${x} 0 ${x / 2} ${y} 0 0 Z`,
  }),
  enter: ({ x, y }: { x: number; y: number }) => ({
    d: `M0 0 L${x} 0 L${x} ${y} C${x} ${y} ${x / 2} ${y} 0 ${y} Z`,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  }),
  exit: ({ x, y }: { x: number; y: number }) => ({
    d: `M0 0 L${x} 0 L${x} 0 C${x} 0 ${x / 2} ${y} 0 0 Z`,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  }),
};
