import { List, ListItem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export function CheckList({ items }: { items: string[] }) {
  return (
    <List
      spacing="xs"
      styles={{
        itemWrapper: { alignItems: "flex-start" },
        itemIcon: { marginTop: "var(--space-1)" },
      }}
      icon={
        <IconCheck
          size={18}
          stroke={2.25}
          color="var(--mantine-primary-color-filled)"
          aria-hidden
        />
      }
    >
      {items.map((item, index) => (
        <ListItem key={`${index}-${item}`}>{item}</ListItem>
      ))}
    </List>
  );
}
