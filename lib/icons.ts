import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconLink,
  type Icon,
} from "@tabler/icons-react";

const SOCIAL_ICONS: Record<string, Icon> = {
  linkedin: IconBrandLinkedin,
  instagram: IconBrandInstagram,
  facebook: IconBrandFacebook,
  x: IconBrandX,
  youtube: IconBrandYoutube,
};

export const socialIcon = (name: string) => SOCIAL_ICONS[name] ?? IconLink;
