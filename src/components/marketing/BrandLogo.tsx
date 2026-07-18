import Image from "next/image";

type BrandLogoProps = {
  /** header = wide lockup; mark = square full logo */
  variant?: "header" | "full";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "header",
  className = "",
  priority = false,
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/logo.jpg"
        alt="Air & Ocean Logistics"
        width={1084}
        height={1084}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src="/brand/logo-header.jpg"
      alt="Air & Ocean Logistics"
      width={739}
      height={202}
      className={className}
      priority={priority}
    />
  );
}
