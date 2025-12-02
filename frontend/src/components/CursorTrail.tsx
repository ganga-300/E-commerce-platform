import { useEffect, useRef } from "react";

const COLORS = [
    "#FEF3C7", // Light Yellow
    "#FCE7F3", // Soft Pink
    "#E0F2FE", // Powder Blue
    "#DCFCE7", // Mint Green
    "#FFEDD5", // Peach
    "#F3E8FF", // Lavender
];

export const CursorTrail = () => {
    const requestRef = useRef<number>();
    const dotsRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            // Limit max dots
            if (dotsRef.current.length >= 20) {
                const oldDot = dotsRef.current.shift();
                if (oldDot) oldDot.remove();
            }

            const dot = document.createElement("div");
            const size = Math.random() * 10 + 15; // Random size between 15px and 25px
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];

            // Imperfect circle shape
            const borderRadius = `${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}% / ${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}% ${Math.floor(Math.random() * 20 + 40)}%`;

            dot.style.position = "fixed";
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            dot.style.width = `${size}px`;
            dot.style.height = `${size}px`;
            dot.style.backgroundColor = color;
            dot.style.borderRadius = borderRadius;
            dot.style.pointerEvents = "none";
            dot.style.zIndex = "9999";
            dot.style.transform = "translate(-50%, -50%) scale(1)";
            dot.style.opacity = "0.8";
            dot.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
            dot.style.boxShadow = "2px 2px 0px rgba(0,0,0,0.1)"; // Subtle paper shadow

            containerRef.current.appendChild(dot);
            dotsRef.current.push(dot);

            // Animate out
            requestAnimationFrame(() => {
                dot.style.transform = `translate(-50%, -50%) scale(0.2) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`; // Shrink + slight drift
                dot.style.opacity = "0";
            });

            // Cleanup
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.remove();
                    dotsRef.current = dotsRef.current.filter(d => d !== dot);
                }
            }, 500);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
            dotsRef.current = [];
        };
    }, []);

    return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" />;
};
