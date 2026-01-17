import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Time() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    period: "AM",
  });

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);

  function animateDigit(
    ref: React.RefObject<HTMLDivElement>,
    newValue: string
  ) {
    if (!ref.current) return;

    const currentDigits = ref.current.querySelectorAll(".digit");
    const newDigits = newValue.split("");

    currentDigits.forEach((digitEl, index) => {
      const currentValue = digitEl.textContent;

      if (currentValue !== newDigits[index]) {
        gsap
          .timeline()
          .to(digitEl, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: "back.in",
          })
          .set(digitEl, {
            textContent: newDigits[index],
            y: 20,
            opacity: 0,
          })
          .to(digitEl, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out",
          });
      }
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const formattedHours = hours % 12 || 12;
      const period = hours >= 12 ? "PM" : "AM";

      const newTime = {
        hours: formattedHours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        period: period,
      };

      animateDigit(hoursRef, newTime.hours);
      animateDigit(minutesRef, newTime.minutes);
      animateDigit(secondsRef, newTime.seconds);

      setTime(newTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-[1fr_0.125fr_1fr_0.125fr_1fr_1fr] w-fit gap-0 mt-2 place-content-center items-center justify-center">
      <span ref={hoursRef} className="flex items-center justify-center gap-1">
        <span className="digit">0</span>
        <span className="digit">0</span>
      </span>
      <span>:</span>
      <span ref={minutesRef} className="flex items-center justify-center gap-1">
        <span className="digit">0</span>
        <span className="digit">0</span>
      </span>
      <span>:</span>
      <span ref={secondsRef} className="flex content-center items-center justify-evenly">
        <span className="digit">0</span>
        <span className="digit">0</span>
      </span>
      <span className="ml-1">{time.period}</span>
    </div>
  );
}
