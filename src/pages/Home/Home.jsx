// IMPORTS
import { IconLogout, IconSettings } from "@tabler/icons";
import { memo, useMemo } from "react";
import React, { useState } from "react";
import "../../AGMDCCOMPONENTS/navbar/NavBar.css";
import {
  ArrowLeft,
  Edit,
  PhoneCheck,
  PhoneX,
  UserCheck,
  UserX,
} from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import SideBar from "../../AGMDCCOMPONENTS/sidebar/SideBar";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  Title,
  Divider,
  Group,
  ScrollArea,
  Menu,
  ActionIcon,
  Avatar,
  Switch,
} from "@mantine/core";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import SellerSideBar from "../../AGMDCCOMPONENTS/seller/sidebar/SellerSideBar";
import { userURL } from "../../AGMDCCOMPONENTS/apiCallHelpers/urlToGoToHelper";
import { userType } from "../../AGMDCCOMPONENTS/apiCallHelpers/userDataHelper";
import CustomerSideBar from "../../AGMDCCOMPONENTS/CustomerDashboardComponenets/sidebar/sidebar/CustomerSideBar";
// HOME COMPONENT
const Home = ({ currentLocation }) => {
  const [navbarOpen, setNavbarOpen] = useState(
    localStorage.getItem("navbarState")
  );

  const setDarkMode = () => {
    localStorage.setItem("settings", JSON.stringify({ darkMode: true }));
  };
  const setLightMode = () => {
    localStorage.setItem("settings", JSON.stringify({ darkMode: false }));
  };
  // SELECTOR
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );

  // const [getRoute, setRoute] = useState(route);
  let navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 1000px)");
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(true);
  const darkTheme = createTheme({
    palette: {
      // mode: settings.darkMode ? "dark" : "light",
    },
  });

  return (
    <MantineProvider
      theme={{
        fontFamily: "Poppins, sans-serif",
        // colorScheme: settings.darkMode ? "dark" : "light",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ThemeProvider theme={darkTheme}>
        <NotificationsProvider position="top-right" limit={1}>
          <ModalsProvider>
            <AppShell
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                },
              }}
              navbarOffsetBreakpoint="md"
              fixed
              navbar={
                <Navbar
                  // sx={{ transition: "1s" }}
                  style={{
                    // height: "100%",
                    // width:
                    //   navbarOpen === "true"
                    //     ? "350px"
                    //     : 0 || !opened
                    //     ? "350px"
                    //     : 0,
                    backgroundColor:
                      userType() === "admin"
                        ? "#DC143C"
                        : userType() === "seller"
                        ? "#e60084"
                        : "#00619E",
                    // backgroundImage:
                    //   JSON.parse(localStorage.getItem("userData")).role ===
                    //   "admin"
                    //     ? "url(https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=)"
                    //     : "url(https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)",
                  }}
                  hiddenBreakpoint="md"
                  hidden={opened}
                  width={{
                    xs: navbarOpen === "true" ? 350 : 0,
                    sm: navbarOpen === "true" ? 350 : 0,
                    md: navbarOpen === "true" ? 350 : 0,
                    lg: navbarOpen === "true" ? 350 : 0,
                  }}
                >
                  <ScrollArea type="never" offsetScrollbars>
                    {userType() === "admin" ? (
                      <SideBar
                        currentLocation={currentLocation}
                        setOpened={setOpened}
                      />
                    ) : userType() === "seller" ? (
                      <SellerSideBar />
                    ) : (
                      <CustomerSideBar />
                    )}
                  </ScrollArea>
                </Navbar>
              }
              header={
                <Header height={70}>
                  {matches ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Group>
                        <div
                          style={{
                            backgroundColor:
                              userType() === "admin"
                                ? "#DC143C"
                                : userType() === "seller"
                                ? "#e60084"
                                : "#00619E",
                            // backgroundImage:
                            //   JSON.parse(localStorage.getItem("userData"))
                            //     .role === "admin"
                            //     ? "url(https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=)"
                            //     : "url(https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRleHR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60)",
                            // transition: "1s",
                            width: navbarOpen === "true" ? 349 : 0,
                            height: "70px",
                          }}
                        >
                          <Group position="apart" py="sm" px="md">
                            <Title
                              hidden={navbarOpen === "true" ? false : true}
                              size={50}
                              style={{
                                color: "white",
                              }}
                            >
                              GMDC
                            </Title>
                            <ActionIcon
                              hidden={navbarOpen === "true" ? false : true}
                              variant="transparent"
                              color={"white"}
                              // radius="lg"
                              onClick={() => {
                                if (
                                  localStorage.getItem("navbarState") === "true"
                                ) {
                                  setNavbarOpen("false");
                                  localStorage.setItem("navbarState", false);
                                } else {
                                  setNavbarOpen("true");
                                  localStorage.setItem("navbarState", true);
                                }
                              }}
                            >
                              {navbarOpen === "true" && (
                                <ArrowLeft color="white" />
                              )}
                            </ActionIcon>
                          </Group>
                          <Divider color="gray" />
                        </div>
                        <ActionIcon
                          variant="transparent"
                          // radius="lg"
                          onClick={() => {
                            if (
                              localStorage.getItem("navbarState") === "true"
                            ) {
                              setNavbarOpen("false");
                              localStorage.setItem("navbarState", false);
                            } else {
                              setNavbarOpen("true");
                              localStorage.setItem("navbarState", true);
                            }
                          }}
                        >
                          {navbarOpen !== "true" && (
                            <Burger color={theme.colors.gray[6]} />
                          )}
                        </ActionIcon>
                      </Group>
                      <Group>
                        <Text weight="bold" size={23}>
                          {userType() === "admin"
                            ? "GMDC ADMIN PANEL"
                            : userType() === "seller"
                            ? "GMDC SELLER PANEL"
                            : "GMDC CUSTOMER PANEL"}
                        </Text>
                        <Text color="#00619E" size={23}>
                          {currentLocation}
                        </Text>
                      </Group>
                      {/* </div> */}
                      <div className="items">
                        <div className="item" style={{ cursor: "pointer" }}>
                          <Group position="center">
                            <Switch
                              size="lg"
                              onLabel="Dark"
                              offLabel="Light"
                              // checked={settings.darkMode}
                              onChange={(event) => {
                                // event.currentTarget.checked
                                //   ? setApptheme("dark")
                                //   : setApptheme("light");
                                event.currentTarget.checked
                                  ? setDarkMode()
                                  : setLightMode();

                                // setChecked(event.currentTarget.checked);
                              }}
                            />
                            <Menu
                              withArrow
                              width={350}
                              position="bottom"
                              transition="pop"
                            >
                              <Menu.Target>
                                <ActionIcon>
                                  <Avatar
                                    radius="xl"
                                    src={loggedInUser?.profileImage?.image}
                                  />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item>
                                  <Group>
                                    <Avatar
                                      radius="xl"
                                      size={"lg"}
                                      src={loggedInUser?.profileImage?.image}
                                    />
                                    <div>
                                      <Text weight={500}>
                                        {loggedInUser?.name}
                                      </Text>
                                      <Text size="xs" color="dimmed">
                                        {loggedInUser?.email}
                                      </Text>
                                      <Text size="xs" color="dimmed">
                                        {loggedInUser?.role}
                                      </Text>
                                    </div>
                                  </Group>
                                </Menu.Item>

                                <Menu.Divider />
                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item
                                  icon={<Edit color="green" />}
                                  onClick={() => {
                                    navigate(`/${userURL()}/editProfile`, {
                                      state: {
                                        // ID: user.id,
                                        // NAME: user.name,
                                        // EMAIL: user.email,
                                        // USERTYPE: user.userType,
                                        // PROFILEIMAGE: user.profileImage,
                                        // ISEMAILVERIFIED: user.isEmailVerified,
                                        // ISPHONEVERIFIED: user.isPhoneVerified,
                                        // CNIC: user.CNIC,
                                        // PHONE: user.phone,
                                        // TOKEN: user.token,
                                      },
                                    });
                                  }}
                                >
                                  Edit Profile
                                </Menu.Item>
                                {/* As No More Settings, it has been commented. */}
                                {/* 
                                <Menu.Item
                                  icon={<IconSettings />}
                                  onClick={() => navigate("/settings")}
                                >
                                  Account settings
                                </Menu.Item>
                                <Menu.Divider /> */}
                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                  icon={<IconLogout />}
                                  onClick={() => {
                                    localStorage.setItem("userToken", "");
                                    localStorage.setItem("userType", "");
                                    localStorage.clear();
                                    navigate("/");
                                  }}
                                >
                                  Logout
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <MediaQuery largerThan="md" styles={{ display: "none" }}>
                        <Burger
                          opened={!opened}
                          onClick={() => setOpened((o) => !o)}
                          size="md"
                          // pl={15}
                          px="md"
                          color={theme.colors.gray[6]}
                          // mr="xl"
                        />
                      </MediaQuery>
                      <div>
                        <Title>GMDC</Title>
                      </div>

                      <div className="items">
                        <div className="item" style={{ cursor: "pointer" }}>
                          <Group position="center">
                            <Menu
                              withArrow
                              width={350}
                              position="bottom"
                              transition="pop"
                            >
                              <Menu.Target>
                                <ActionIcon>
                                  <Avatar
                                    radius="xl"
                                    src={loggedInUser?.profileImage?.image}
                                  />
                                </ActionIcon>
                              </Menu.Target>
                              <Menu.Dropdown>
                                <Menu.Item>
                                  <Group>
                                    <Avatar
                                      radius="xl"
                                      size={"lg"}
                                      src={loggedInUser?.profileImage?.image}
                                    />
                                    <div>
                                      <Text weight={500}>
                                        {loggedInUser?.name}
                                      </Text>
                                      <Text size="xs" color="dimmed">
                                        {loggedInUser?.email}
                                      </Text>
                                      <Text size="xs" color="dimmed">
                                        {loggedInUser?.role}
                                      </Text>
                                    </div>
                                  </Group>
                                </Menu.Item>

                                <Menu.Divider />
                                <Menu.Label>Settings</Menu.Label>
                                <Menu.Item
                                  icon={<Edit color="green" />}
                                  onClick={() => {
                                    navigate(`/${userURL()}/editProfile`, {
                                      state: {
                                        // ID: user.id,
                                        // NAME: user.name,
                                        // EMAIL: user.email,
                                        // USERTYPE: user.userType,
                                        // PROFILEIMAGE: user.profileImage,
                                        // ISEMAILVERIFIED: user.isEmailVerified,
                                        // ISPHONEVERIFIED: user.isPhoneVerified,
                                        // CNIC: user.CNIC,
                                        // PHONE: user.phone,
                                        // TOKEN: user.token,
                                      },
                                    });
                                  }}
                                >
                                  Edit Profile
                                </Menu.Item>
                                {/* As No More Settings, it has been commented. */}
                                {/* 
                            <Menu.Item
                              icon={<IconSettings />}
                              onClick={() => navigate("/settings")}
                            >
                              Account settings
                            </Menu.Item>
                            <Menu.Divider /> */}
                                <Menu.Label>Danger zone</Menu.Label>
                                <Menu.Item
                                  icon={<IconLogout />}
                                  onClick={() => {
                                    localStorage.setItem("userToken", "");
                                    localStorage.setItem("userType", "");
                                    localStorage.clear();
                                    navigate("/login");
                                  }}
                                >
                                  Logout
                                </Menu.Item>
                              </Menu.Dropdown>
                            </Menu>
                          </Group>
                        </div>
                      </div>
                    </div>
                  )}
                </Header>
              }
            >
              <Outlet />
            </AppShell>
          </ModalsProvider>
        </NotificationsProvider>
      </ThemeProvider>
    </MantineProvider>
  );
};

export default memo(Home);
// <div>
// <h1>User Data</h1>
// <p>id: {user.id}</p>
// <p>userName: {user.userName}</p>
// <p>email: {user.email}</p>
// <p>userType:{user.userType}</p>
// <p>profileImage: {user.profileImage}</p>
// <p>isEmailVerified:</p>
// <p>isPhoneVerified:</p>
// <p>token: {user.token}</p>
// </div>
