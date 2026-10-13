import Image from "next/image";

type CmsImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Fills its positioned parent with an image path written by Pages CMS. */
export function CmsImage({
  src,
  alt = "",
  sizes,
  priority,
  className,
}: CmsImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg") || /^https?:/.test(src)}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}
