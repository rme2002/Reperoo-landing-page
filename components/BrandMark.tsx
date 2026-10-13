import Image from "next/image";

/** The site logo when one is set in the CMS, otherwise the name's first letter. */
export function BrandMark({
  name,
  logo,
  size,
  className,
}: {
  name: string;
  logo?: string;
  size: number;
  className?: string;
}) {
  if (logo) {
    return (
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        style={{ borderRadius: size * 0.24 }}
      />
    );
  }
  return (
    <span className={className} style={{ width: size, height: size }}>
      {name.charAt(0)}
    </span>
  );
}
