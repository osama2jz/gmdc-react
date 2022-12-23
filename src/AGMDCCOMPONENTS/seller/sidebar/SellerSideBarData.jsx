import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import {
  UserCircle,
  Users,
  BuildingPavilon,
  Plus,
  BuildingCommunity,
  BuildingStore,
  Capture,
  CreditCard,
  Cash,
  MessageCircle2,
  Blockquote,
  Help,
  Stars,
  ShoppingCart,
  BoxMultiple,
  Eye,
  Briefcase,
  Settings,
  ToolsKitchen,
  Notebook,
  UserPlus,
  Map,
  ZoomQuestion,
} from "tabler-icons-react";

export const SellerSideBarData = [
  {
    title: "1 - Dashboard",
    path: "/user/",
    icon: <AiIcons.AiFillHome />,
  },
  // {
  //   title: "2 - Users",
  //   path: "#",
  //   icon: <UserCircle size={20} />,
  //   iconClosed: <RiIcons.RiArrowDownSFill />,
  //   iconOpened: <RiIcons.RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: "2.1 - Add User",
  //       path: "/user/adduser",
  //       icon: <UserPlus size={20} />,
  //       cName: "sub-nav",
  //     },
  //     {
  //       title: "2.2 - View All Users",
  //       path: "/user/viewusers",
  //       icon: <Users size={20} />,
  //       cName: "sub-nav",
  //     },
  //   ],
  // },
  {
    title: "2 - Vehicles",
    path: "#",
    icon: <BuildingPavilon size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "2.1 - Add Vehicle",
        path: "/user/addvehicle",
        icon: <Plus />,
        cName: "sub-nav",
      },
      {
        title: "2.2 - View All Vehicles",
        path: "/user/viewvehicals",
        icon: <Eye />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "3 - Orders",
    path: "#",
    icon: <BuildingPavilon size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      // {
      //   title: "4.1 - Add Order",
      //   path: "/user/addOrder",
      //   icon: <Plus />,
      //   cName: "sub-nav",
      // },
      {
        title: "3.1 - View Orders",
        path: "/user/viewOrder",
        icon: <BuildingCommunity size={20} />,
        cName: "sub-nav",
      },
      // {
      //   title: "4.3 - View Paid Orders",
      //   path: "/user/viewPaidOrders",
      //   icon: <BuildingCommunity size={20} />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "4.4 - View Processed Orders",
      //   path: "/user/viewProcessedOrders",
      //   icon: <BuildingCommunity size={20} />,
      //   cName: "sub-nav",
      // },
    ],
  },
  {
    title: "4 - Payments",
    path: "#",
    icon: <ToolsKitchen size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      // {
      //   title: "5.1 - Add Payment",
      //   path: "/user/addPayment",
      //   icon: <Plus size={20} />,
      // },

      {
        title: "4.1 - View Payments",
        path: "/user/viewPayments",
        icon: <Eye size={20} />,
      },
    ],
  },
  {
    title: "5 - Settings",
    path: "/user/editProfile",
    icon: <BoxMultiple size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "6.1 - Add Vendor Categories",
    //     path: "/user/addVendorCategory",
    //     icon: <Plus size={20} />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "6.2 - View Vendor Categories",
    //     path: "/user/vendorCategories",
    //     icon: <Eye size={20} />,
    //     cName: "sub-nav",
    //   },
    // ],
  },
];
