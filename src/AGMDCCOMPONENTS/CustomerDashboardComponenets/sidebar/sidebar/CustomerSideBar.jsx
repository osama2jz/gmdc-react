import React, { useState } from "react";
import styled from "styled-components";

import { SellerSideBarData } from "./CustomerSideBarData";
import SellerSubMenu from "./CustomerSubMenu";
import { IconContext } from "react-icons/lib";
const SidebarNav = styled.nav`
  // overflow:scroll;
  background-position: center;

  width: "350px";
  height: "100%";
  height: "fill";
  display: "flex";
  justify-content: "center";
  // position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: "600ms";
  // z-index: 10;
`;

const SidebarWrap = styled.div`
  width: "350px";
`;

const CustomerSideBar = ({ currentLocation, setOpened }) => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {SellerSideBarData.map((item, index) => {
              return (
                <SellerSubMenu
                  route={currentLocation}
                  item={item}
                  key={index}
                  setOpened={setOpened}
                />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default CustomerSideBar;
