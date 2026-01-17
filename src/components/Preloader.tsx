import { useEffect, useState } from "react";

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

const Preloader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const preloader = document.querySelector('.preloader');
    preloader?.remove();

    if (index == words.length - 1) setIndex(0);

    let animationFrameId: number;
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const delay = 500

      if (elapsed >= delay) {
        setIndex(index + 1)
      } else {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [index]);

  return (
    <div className="relative h-screen w-screen grid place-items-center bg-[#181A1F]">
      <span
        className="flex justify-center text-white text-4xl items-center whitespace-nowrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[30]"
      >
        {words[index]}
      </span>
    </div>
  );
};

export default Preloader;
