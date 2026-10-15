import Image from "next/image";
import { withBasePath } from "@/lib/paths";

type CmsImageProps = {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
};

/** Fills its positioned parent with an image path written by Pages CMS. */
export function CmsImage({
  src,
  alt = "",
  sizes,
  priority,
  fit = "cover",
  className,
}: CmsImageProps) {
  return (
    <Image
      src={withBasePath(src)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: fit }}
    />
  );
}
