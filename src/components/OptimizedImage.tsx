import React from "react";

// meta.json maps original asset paths to optimized variants and placeholders
import metaJson from "../assets/optimized/meta.json";

type MetaEntry = {
  src: string;
  variants: Record<string, { webp?: string; jpg?: string }>;
  placeholder?: string | null;
};

const META = metaJson as unknown as Record<string, MetaEntry>;

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  // The original asset path as recorded in meta.json (e.g. "home/program1.jpg")
  src: string;
}

export default function OptimizedImage({
  src,
  alt,
  sizes,
  loading = "lazy",
  style,
  ...imgProps
}: Props) {
  const entry = META[src];

  if (!entry) {
    // Fallback to the original asset path under src/assets
    const fallback = new URL(`../assets/${src}`, import.meta.url).href;
    return (
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        sizes={sizes}
        style={style}
        {...imgProps}
      />
    );
  }

  const widths = Object.keys(entry.variants)
    .map((w) => Number(w))
    .sort((a, b) => a - b);

  const webpSrcSet = widths
    .map((w) => {
      const v = entry.variants[String(w)]?.webp;
      if (!v) return null;
      const file = v.replace(/^\.\/optimized\//, "");
      return `${
        new URL(`../assets/optimized/${file}`, import.meta.url).href
      } ${w}w`;
    })
    .filter(Boolean)
    .join(", ");

  const jpgSrcSet = widths
    .map((w) => {
      const v =
        entry.variants[String(w)]?.jpg || entry.variants[String(w)]?.webp;
      if (!v) return null;
      const file = v.replace(/^\.\/optimized\//, "");
      return `${
        new URL(`../assets/optimized/${file}`, import.meta.url).href
      } ${w}w`;
    })
    .filter(Boolean)
    .join(", ");

  // Fallback src is the original asset
  const fallbackSrc = new URL(`../assets/${entry.src}`, import.meta.url).href;

  return (
    <picture>
      {webpSrcSet ? (
        <source type='image/webp' srcSet={webpSrcSet} sizes={sizes} />
      ) : null}
      {jpgSrcSet ? (
        <source type='image/jpeg' srcSet={jpgSrcSet} sizes={sizes} />
      ) : null}
      <img
        src={fallbackSrc}
        alt={alt}
        loading={loading}
        sizes={sizes}
        style={style}
        {...imgProps}
      />
    </picture>
  );
}
