import { useEffect, useState } from "react";
import { IPosition } from "./types";

export default function usePosition() {
    const [cursor, setCursor] = useState<IPosition>({ x: window.innerWidth / 3, y: window.innerHeight / 3 });

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;

            if (x !== undefined && y !== undefined) {
                setCursor({ x, y });
            }
        };

        const touchMove = (e: TouchEvent) => {
            const x = e.touches && e.touches[0]?.clientX;
            const y = e.touches && e.touches[0]?.clientY;

            if (x !== undefined && y !== undefined) {
                setCursor({ x, y });
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("touchmove", touchMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("touchmove", touchMove);
        };
    }, []);

    return cursor
}