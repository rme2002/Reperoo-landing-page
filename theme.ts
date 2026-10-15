import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from "@mantine/core";

// Shade 4 is the accent, shade 3 its hover.
const mahogany: MantineColorsTuple = [
  "#faf2ef",
  "#f3e0d9",
  "#e8bfb1",
  "#d9917b",
  "#c97a63",
  "#a85541",
  "#7a2e22",
  "#5e2119",
  "#4a1a13",
  "#2a0f09",
];

const gray: MantineColorsTuple = [
  "#faf7f6",
  "#f4f0ee",
  "#efe9e6",
  "#e8e1de",
  "#e0d8d4",
  "#8c7e78",
  "#665953",
  "#4f4440",
  "#352c29",
  "#1c1614",
];

const dark: MantineColorsTuple = [
  "#f6efec",
  "#d4c6c0",
  "#b0a09a",
  "#8c7e78",
  "#352723",
  "#2e2320",
  "#221917",
  "#17110f",
  "#120d0b",
  "#0b0807",
];

const colors = { mahogany, gray, dark };

export const theme = createTheme({
  colors,
  primaryColor: "mahogany",
  primaryShade: 4,
  autoContrast: true,
  luminanceThreshold: 0.25,
  black: "#1c1614",
  respectReducedMotion: true,
  spacing: { xs: "8px", sm: "12px", md: "16px", lg: "24px", xl: "32px" },
  radius: { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px" },
  defaultRadius: "md",
  fontSizes: { xs: "14px", sm: "14px", md: "16px", lg: "18px", xl: "18px" },
  lineHeights: { xs: "1.5", sm: "1.5", md: "1.6", lg: "1.6", xl: "1.6" },
  components: {
    Button: { defaultProps: { size: "md", variant: "filled" } },
  },
  headings: {
    fontWeight: "700",
    textWrap: "balance",
    sizes: {
      h1: { fontSize: "56px", lineHeight: "1.05" },
      h2: { fontSize: "40px", lineHeight: "1.1" },
      h3: { fontSize: "24px", lineHeight: "1.25" },
      h4: { fontSize: "18px", lineHeight: "1.4" },
      h5: { fontSize: "16px", lineHeight: "1.5" },
      h6: { fontSize: "16px", lineHeight: "1.5" },
    },
  },
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {},
  dark: {
    "--mantine-color-mahogany-filled-hover": "var(--mantine-color-mahogany-3)",
    "--mantine-color-mahogany-light":
      "color-mix(in srgb, var(--mantine-color-mahogany-4) 16%, transparent)",
    "--mantine-color-mahogany-light-hover":
      "color-mix(in srgb, var(--mantine-color-mahogany-4) 24%, transparent)",
    "--mantine-color-mahogany-light-color": "var(--mantine-color-mahogany-2)",
    "--mantine-color-error": "var(--mantine-color-red-4)",
  },
});
