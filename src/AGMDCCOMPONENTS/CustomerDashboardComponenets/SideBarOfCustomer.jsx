import { useState } from "react";
import { IconSettings, IconLayoutGrid, IconList } from "@tabler/icons";
import { Box, NavLink, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    icon: IconLayoutGrid,
    label: "Dashboard",
    path: "/customer/",
    // description: "Item with description",
  },

  // {
  //   icon: IconBrandStripe,
  //   label: "Payments",
  //   rightSection: <IconChevronRight size={14} stroke={1.5} />,
  //   path: "#",

  //   subNav: [
  //     {
  //       icon: IconBuildingFortress,
  //       label: "Venue Payments",
  //       path: "venuePayments",
  //     },
  //     {
  //       icon: IconBuildingStore,
  //       label: "Vendor Payments",
  //       path: "vendorPayments",
  //     },
  //   ],
  // },

  { icon: IconList, label: "Orders", path: "/customer/orders" },
  { icon: IconSettings, label: "Settings", path: "/customer/profile" },
];

const SideBarOfCustomer = ({ setOpened }) => {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      styles={{ label: { fontSize: "1rem" } }}
      color={"red"}
      // className={active === index ? "fgColorF" : ""}
      key={item.label}
      active={!item.subNav && active === index}
      label={index + 1 + " - " + item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon className="fgColorF" size={25} stroke={1.5} />}
      component={Link}
      to={item.path}
      onClick={() => {
        setActive(index);
        setSubActive(null);
        if (!item.subNav) {
          setOpened(false);
        }
      }}
      // classNames={{
      //   body: {
      //     border: active === index ? "1px solid red" : "1px solid blue",
      //   },
      // }}
    >
      {item.subNav &&
        item.subNav.map((subItem, i) => (
          <NavLink
            color={"red"}
            styles={{ label: { fontSize: "1rem" } }}
            active={active === index && subActive === i}
            key={subItem.label}
            label={index + 1 + "." + (i + 1) + " - " + subItem.label}
            icon={<subItem.icon className="fgColorF" size={25} stroke={1.5} />}
            component={Link}
            to={subItem.path}
            onClick={() => {
              setSubActive(i);
              setActive(index);
              setOpened(false);
            }}
          />
        ))}
    </NavLink>
  ));

  return (
    <Paper style={{ width: "", height: "80vh" }} withBorder>
      <Box sx={{ width: "300px ", height: "100%" }}>{items}</Box>
    </Paper>
  );
};

export default SideBarOfCustomer;
