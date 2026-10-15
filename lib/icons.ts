import {
  IconBolt,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconChartBar,
  IconClock,
  IconCloudOff,
  IconDeviceMobile,
  IconFolder,
  IconGauge,
  IconHeart,
  IconLayoutKanban,
  IconLeaf,
  IconLink,
  IconLivePhoto,
  IconLock,
  IconPalette,
  IconPhoto,
  IconRocket,
  IconShieldCheck,
  IconSparkles,
  IconUsb,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";

const FEATURE_ICONS: Record<string, Icon> = {
  layout: IconLayoutKanban,
  users: IconUsers,
  bolt: IconBolt,
  chart: IconChartBar,
  lock: IconLock,
  device: IconDeviceMobile,
  heart: IconHeart,
  rocket: IconRocket,
  clock: IconClock,
  leaf: IconLeaf,
  palette: IconPalette,
  sparkles: IconSparkles,
  shield: IconShieldCheck,
  photo: IconPhoto,
  "live-photo": IconLivePhoto,
  folder: IconFolder,
  usb: IconUsb,
  "cloud-off": IconCloudOff,
  gauge: IconGauge,
};

const SOCIAL_ICONS: Record<string, Icon> = {
  linkedin: IconBrandLinkedin,
  instagram: IconBrandInstagram,
  facebook: IconBrandFacebook,
  x: IconBrandX,
  youtube: IconBrandYoutube,
};

export const featureIcon = (name: string) =>
  FEATURE_ICONS[name] ?? IconSparkles;
const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X",
  youtube: "YouTube",
};

export const socialIcon = (name: string) => SOCIAL_ICONS[name] ?? IconLink;
export const socialLabel = (name: string) => SOCIAL_LABELS[name] ?? name;
