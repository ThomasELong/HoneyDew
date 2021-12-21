import React, { useState, useContext } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          HoneyDew
        </NavbarBrand>
        <Nav navbar>
          {isLoggedIn && (
            <>
              <NavItem tag={RRNavLink} to="/">
              <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                Project Dashboard
                </a>
              </NavItem>
              <NavItem tag={RRNavLink} to="/taskList">
              <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                Tasks
                </a>
              </NavItem>
              <NavItem tag={RRNavLink} to="/">
              <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                Shopping List
                </a>
              </NavItem>
              <NavItem>
                <a
                  aria-current="page"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={logout}
                >
                  Logout
                </a>
              </NavItem>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavItem>Please sign in</NavItem>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}