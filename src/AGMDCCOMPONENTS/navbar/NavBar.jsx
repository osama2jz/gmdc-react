import "./NavBar.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider, Button } from "@mantine/core";
import { Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Badge } from "@mantine/core";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import {
    AppShell,
    Navbar,
    Menu,
    Header,
    Footer,
    Aside,
    Text,
    MediaQuery,
    Burger,
    useMantineTheme,
    ScrollArea,
  } from "@mantine/core";
const NavBar = ({ pageName }) => {
    const matches = useMediaQuery("(min-width: 770px)");

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
              <div>
                {matches ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      width={300}
                      height={80}
                      src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    />
                    <div className="search">
                      <input type="text" placeholder="Search..." />
                      <SearchIcon className="icon" />
                    </div>
                    <div className="items">
                      <div className="item">
                        <MessageIcon className="icon" />
                        <div className="counter">1</div>
                      </div>
                      <div className="item">
                        <NotificationsIcon className="icon" />
                        <div className="counter">1</div>
                      </div>
                      <div className="item">
                        <img
                          src="https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt=""
                          className="avatar"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between ",
                    }}
                  >
                    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                      <div style={{ padding:"10px", alignItems: "center", justifyContent: "center" }}>
                        <Burger
                          opened={opened}
                          onClick={() => setOpened((o) => !o)}
                          size="md"
                          color={theme.colors.gray[6]}
                          mr="xl"
                          // p="lg"
                        />
                      </div>
                    </MediaQuery>
                    <Image
                      width={300}
                      height={80}
                      src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    />
                    <div className="items">
                      <div className="item">
                        <img
                          src="https://images.pexels.com/photos/1035665/pexels-photo-1035665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt=""
                          className="avatar"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
  );
};

export default NavBar;