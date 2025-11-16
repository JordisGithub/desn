import { useEffect, useRef } from "react";

export default function useLazyBackgroundLight() {
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
              el.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg})`;
              el.style.backgroundSize = "cover";
              el.style.backgroundPosition = "center";
              el.style.backgroundRepeat = "no-repeat";
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
