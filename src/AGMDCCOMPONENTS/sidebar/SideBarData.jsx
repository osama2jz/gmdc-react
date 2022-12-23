import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import {
  UserCircle,
  Users,
  BuildingPavilon,
  Plus,
  BuildingCommunity,
  BoxMultiple,
  Eye,
  ToolsKitchen,
  UserPlus,
  Layout2,
  Car,
  List,
  BrandStripe,
  Settings,
} from "tabler-icons-react";

export const SideBarData = [
  {
    title: "1 - Dashboard",
    path: "/user/",
    icon: <Layout2 size={21} />,
  },
  {
    title: "2 - Users",
    path: "#",
    icon: <Users size={21} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "2.1 - Add User",
        path: "/user/adduser",
        icon: <UserPlus size={20} />,
        cName: "sub-nav",
      },
      {
        title: "2.2 - View All Users",
        path: "/user/viewusers",
        icon: <Users size={20} />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "3 - Vehicles",
    path: "#",
    icon: <Car size={21} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "3.1 - Add Vehicle",
        path: "/user/addvehicle",
        icon: <Plus />,
        cName: "sub-nav",
      },
      {
        title: "3.2 - View All Vehicles",
        path: "/user/viewvehicals",
        icon: <Eye />,
        cName: "sub-nav",
      },
    ],
  },

  {
    title: "4 - Orders",
    path: "#",
    icon: <List size={21} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "4.1 - Add Order",
        path: "/user/addOrder",
        icon: <Plus size={20} />,
        cName: "sub-nav",
      },
      {
        title: "4.2 - View Orders",
        path: "/user/viewOrder",
        icon: <Eye size={20} />,
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
    title: "5 - Payments",
    path: "#",
    icon: <BrandStripe size={21} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "5.1 - Add Payment",
        path: "/user/addPayment",
        icon: <Plus size={20} />,
      },

      {
        title: "5.2 - View Payments",
        path: "/user/viewPayments",
        icon: <Eye size={20} />,
      },
      // {
      //   title: "5.3 - View Paid Payments",
      //   path: "/user/viewPaidPayments",
      //   icon: <Eye size={20} />,
      // },
    ],
  },
  {
    title: "6 - Settings",
    path: "/user/editProfile",
    icon: <Settings size={21} />,
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
