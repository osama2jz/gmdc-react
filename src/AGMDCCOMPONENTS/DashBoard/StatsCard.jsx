import { Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { userType } from "../apiCallHelpers/userDataHelper";

export function StatsCard({ data, cols }) {
  const COLORS = ["#DC143C", "#DC143C", "#DC143C", "#DC143C", "#DC143C"];

  return (
    <SimpleGrid
      cols={cols}
      breakpoints={[
        { maxWidth: "xl", cols: 1 },
        { maxWidth: "lg", cols: 1 },
        { maxWidth: "md", cols: 1 },
        { maxWidth: "sm", cols: 1 },
      ]}
    >
      {data.map((stat, index) => {
        return (
          <Paper
            p="md"
            withBorder
            radius="md"
            key={index}
            style={{
              backgroundColor: `${
                userType() === "admin"
                  ? "#DC143C"
                  : userType() === "seller"
                  ? "#e60084"
                  : "#00619E"
              }`,
              // display: "flex",
              // justifyContent: "space-between",
              // alignItems: "center",
            }}
          >
            <Stack align="center">
              <Text size={18} color="white">
                {stat.title}
              </Text>

              <Text
                px="xs"
                weight="bold"
                size={30}
                align="center"
                color="white"
              >
                {stat.value}
              </Text>
            </Stack>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}
