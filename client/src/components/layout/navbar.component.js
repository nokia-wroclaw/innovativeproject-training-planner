import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

export default class Navbar extends Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px", padding: "0 50px", marginBottom: "50px" }}
      >
        <Menu.Item key="1">
          <Link to="/"> Dashboard </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/useres"> Create User </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/inviteTemplate"> Create Template </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/invitation"> Invitation </Link>
          {/* <Link to="/invitationtest"> Invitation </Link> */}
        </Menu.Item>
      </Menu>
    );
  }
}
