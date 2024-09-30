import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";
// Material Dashboard 2 React context

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import { useState } from "react";
import {
  Button,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseItemSubRoute,
  collapseText,
} from "./styles/sidenavCollapse";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function Sidenav({ color, brand, brandName, routes, ...rest }) {
  // const [controller] = useMaterialUIController();

  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const collapseName = location.pathname.replace("/", "");

  const handleDropdownToggle = (key, route) => {
    handleRouteChange(route);

    setOpenDropdown((prevOpenDropdown) => (prevOpenDropdown === key ? null : key));
  };
  const handleRouteChange = (route) => {
    setActiveRoute(route);
  };
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      // setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      // setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
      setTransparentSidenav(dispatch, transparentSidenav);
      setWhiteSidenav(dispatch, whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // check subrotues present

  const checkActiveRoute = (activeRoute, routes) => {
    return routes?.some((route) => route.route === activeRoute);
  };

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, subRoutes }) => {
      let returnValue;
      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={
                activeRoute === route || openDropdown || checkActiveRoute(activeRoute, subRoutes)
              }
              noCollapse={noCollapse}
              isOpened={key === openDropdown}
              isCollapsibleMenu={subRoutes && subRoutes.length > 0}
              onClick={() => handleDropdownToggle(key, route)}
            />
            {subRoutes && subRoutes.length > 0 && (
              <Collapse in={openDropdown === key} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subRoutes.map((subRoute) => (
                    <ListItem
                      components={Button}
                      key={subRoute.key}
                      component={NavLink}
                      to={subRoute.route}
                      selected={activeRoute === subRoute.route}
                      onClick={() => handleRouteChange(subRoute.route)}
                    >
                      <MDBox
                        {...rest}
                        sx={(theme) =>
                          collapseItem(theme, {
                            active,
                            transparentSidenav,
                            whiteSidenav,
                            darkMode,
                            sidenavColor,
                          })
                        }
                      >
                        <ListItemText
                          primary={subRoute.name}
                          sx={(theme) =>
                            collapseText(theme, {
                              miniSidenav,
                              transparentSidenav,
                              whiteSidenav,
                              active,
                            })
                          }
                        />
                      </MDBox>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Link>
        ) : (
          <div key={key}>
            <NavLink to={route} style={{ textDecoration: "none" }}>
              <SidenavCollapse
                name={name}
                icon={icon}
                active={location.pathname === route || checkActiveRoute(activeRoute, subRoutes)}
                onClick={() => handleDropdownToggle(key, route)}
                isOpened={key === openDropdown}
                isCollapsibleMenu={subRoutes && subRoutes.length > 0}
              />
            </NavLink>
            {subRoutes && subRoutes.length > 0 && (
              <Collapse in={openDropdown === key} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subRoutes.map((subRoute) => (
                    <ListItem
                      components={Button}
                      key={subRoute.key}
                      component={NavLink}
                      to={subRoute.route}
                      selected={activeRoute === subRoute.route}
                      onClick={() => handleRouteChange(subRoute.route)}
                      sx={{ background: "transparent !important" }}
                    >
                      <MDBox
                        // {...rest}
                        sx={(theme) =>
                          collapseItemSubRoute(theme, {
                            active: activeRoute === subRoute.route ? true : false,
                            transparentSidenav,
                            whiteSidenav,
                            darkMode,
                            sidenavColor,
                          })
                        }
                      >
                        <Typography fontSize={"14px"} fontWeight={"normal"}>
                          {subRoute.name.length > 25
                            ? `${subRoute.name.substring(0, 15)}...`
                            : subRoute.name}
                        </Typography>
                      </MDBox>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color="secondary"
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox
          //  component={NavLink} to="/"
          display="flex"
          alignItems="center"
        >
          {brand && <MDBox component="img" src={brand} alt="Brand" width="10rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color="primary">
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
