import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import { BuildingPavilon, BoxMultiple } from "tabler-icons-react";

export const SellerSideBarData = [
  {
    title: "1 - Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "2 - Dashboard",
    path: "/customer",
    icon: <AiIcons.AiFillDatabase />,
  },

  {
    title: "3 - My Orders",
    path: "/customer/orders",
    icon: <BuildingPavilon size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "4 - Settings",
    path: "/customer/profile",
    icon: <BoxMultiple size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
