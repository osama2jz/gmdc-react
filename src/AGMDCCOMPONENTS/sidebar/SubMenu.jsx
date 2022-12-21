import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 10px 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
  }
  &:focus {
    background: black;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  // background: #414757;
  height: 50px;
  padding-left: 2rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  align-items: center;

  color: #e4e8e5;
  font-size: 17px;
  &:hover {
    background: #252831;

    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
  }
  &:focus {
    background: black;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    cursor: pointer;
  }
`;

const SubMenu = ({ item, route, setOpened }) => {
  const [bg, setBG] = useState("red");
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={() => {
          if (item.subNav) {
            showSubnav();
            return;
          }
          setOpened(true);
        }}
      >
        <div style={{}}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <span onClick={setOpened}>
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            </span>
          );
        })}
    </>
  );
};

export default SubMenu;
