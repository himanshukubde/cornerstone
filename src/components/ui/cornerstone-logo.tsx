import type { ImgHTMLAttributes } from "react";

interface CornerstoneLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}

export function CornerstoneLogo({
  variant = "dark",
  height = 22,
  className = "",
  style,
  ...props
}: CornerstoneLogoProps) {
  // Aspect ratio is 1565 / 180 ~= 8.694
  const aspectRatio = 1565 / 180;
  const computedWidth = Math.round(height * aspectRatio);

  const src = variant === "light"
    ? "/images/cornerstone-logo-white.png"
    : "/images/cornerstone-logo.png";

  return (
    <img
      src={src}
      alt="Cornerstone"
      width={computedWidth}
      height={height}
      className={`inline-block select-none ${className}`}
      style={{
        height: `${height}px`,
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        objectPosition: "left center",
        display: "block",
        ...style,
      }}
      {...props}
    />
  );
}
