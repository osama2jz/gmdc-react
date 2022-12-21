import { ActionIcon, Divider, Drawer, Group, Paper, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconCurrentLocation, IconMenu2 } from "@tabler/icons";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "../DashBoard/Dashboard";
import SideBarOfCustomer from "./SideBarOfCustomer";

const CustomerDashboard = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [allowView, setAllowView] = useState(true);

  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const [opened, setOpened] = useState(false);
  return (
    // <Container size={"xl"}>
    <Paper p={"md"} style={{ height: "100%", width: "100%" }}>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Dashboard Options"
        padding="xl"
        size="lg"
        position="left"
      >
        <SideBarOfCustomer setOpened={setOpened} />
      </Drawer>

      {!matches1200 && (
        <Group position="apart" align={"center"}>
          <Text size={"xl"} weight={500}>
            Customer Dashboard
          </Text>
          <ActionIcon
            variant="outline"
            size={43}
            className="border fgColorF"
            onClick={() => {
              setOpened(true);
            }}
          >
            <IconMenu2 />
          </ActionIcon>
        </Group>
      )}
      {!matches1200 && <Divider my="lg" />}
      {allowView && (
        <Group
          align={"flex-start"}
          noWrap
          style={{ flexShrink: 0, height: "100%" }}
        >
          {matches1200 ? <SideBarOfCustomer setOpened={setOpened} /> : null}
          <Outlet />
        </Group>
      )}
    </Paper>
    // </Container>
  );
};

export default CustomerDashboard;
