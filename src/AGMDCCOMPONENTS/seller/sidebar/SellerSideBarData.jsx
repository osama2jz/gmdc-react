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
    path: "/seller/",
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
  //       path: "/seller/adduser",
  //       icon: <UserPlus size={20} />,
  //       cName: "sub-nav",
  //     },
  //     {
  //       title: "2.2 - View All Users",
  //       path: "/seller/viewusers",
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
        path: "/seller/addvehicle",
        icon: <Plus />,
        cName: "sub-nav",
      },
      {
        title: "2.2 - View All Vehicles",
        path: "/seller/viewvehicals",
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
      //   path: "/seller/addOrder",
      //   icon: <Plus />,
      //   cName: "sub-nav",
      // },
      {
        title: "3.1 - View Orders",
        path: "/seller/viewOrder",
        icon: <BuildingCommunity size={20} />,
        cName: "sub-nav",
      },
      // {
      //   title: "4.3 - View Paid Orders",
      //   path: "/seller/viewPaidOrders",
      //   icon: <BuildingCommunity size={20} />,
      //   cName: "sub-nav",
      // },
      // {
      //   title: "4.4 - View Processed Orders",
      //   path: "/seller/viewProcessedOrders",
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
      //   path: "/seller/addPayment",
      //   icon: <Plus size={20} />,
      // },

      {
        title: "4.1 - View Payments",
        path: "/seller/viewPayments",
        icon: <Eye size={20} />,
      },
    ],
  },
  {
    title: "5 - Settings",
    path: "/seller/editProfile",
    icon: <BoxMultiple size={20} />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "6.1 - Add Vendor Categories",
    //     path: "/seller/addVendorCategory",
    //     icon: <Plus size={20} />,
    //     cName: "sub-nav",
    //   },
    //   {
    //     title: "6.2 - View Vendor Categories",
    //     path: "/seller/vendorCategories",
    //     icon: <Eye size={20} />,
    //     cName: "sub-nav",
    //   },
    // ],
  },
];
