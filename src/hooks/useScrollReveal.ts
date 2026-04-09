import { useEffect, useRef, useState } from "react";

/**
 * Triggers once when the element enters the viewport.
 * The expanded root margin makes the animation start a little earlier,
 * which feels closer to the softer Mouzy section transitions.
 */
export function useScrollReveal(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -15% 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}
