import { useEffect, useRef } from "react";

export default function useLazyBackground() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const el = ref.current as HTMLElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bg = el.getAttribute("data-bg");
            if (bg) {
              el.style.backgroundImage = `url(${bg})`;
              el.removeAttribute("data-bg");
            }
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
