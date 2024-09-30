import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import apiService from "components/ApiSevices/ApiServices";
import { Avatar, Badge, Box, LinearProgress, Popover, Stack, Tooltip, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import logoutIcon from "../../../assets/images/logoutIcon.png";
import ProfileIcon from "../../../assets/images/profile.png";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../../../redux/action/adminActions";
import CloseIcon from '@mui/icons-material/Close';

function DashboardNavbar({ absolute, light, isMini }) {
  const actionDispatcher = useDispatch();
  const navigate = useNavigate();
  const [FileUrl, setFileUrl] = useState(null);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [AdminNotification, setAdminNotification] = useState([]);
  const [notificationLength, setnotificationLength] = useState([]);
  const route = useLocation().pathname.split("/").slice(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [linearProgress, setLinearProgress] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const timeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now - createdDate;

    // Calculate time differences
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximation
    const diffInYears = Math.floor(diffInDays / 365); // Approximation

    // Determine the appropriate time difference string
    if (diffInMinutes < 1) {
      return `just now`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const adminProfile = async () => {
    try {
      const res = await apiService.getAdminProfile();
      console.log("res", res);

      setFileUrl(res?.adminData?.profileImg?.url);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getNotification = async () => {
    try {
      const res = await apiService?.getAllNotificationWithPagination();
      console.log("getAllNotificationWithPagination", res)
      setAdminNotification(res?.data.allNotifications);
      setnotificationLength(res?.data?.allNotifications.length)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  useEffect(() => {
    adminProfile();
  }, []);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  // Update notifications
  const updateNotification = async (id) => {
    setLinearProgress(true)
    try {
      const res = await apiService.updateNotification(id)
      console.log("notification res", res)
      if (res?.data?.success) {
        setLinearProgress(false)
        getNotification()

      }
      console.log("res", res)
    } catch (error) {
      setLinearProgress(false)
      console.log("error", error)
    }
  }
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {/* <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" /> */}
      {
        linearProgress && <LinearProgress color="success" />
      }
      <Stack spacing={1} p={0.5} maxHeight={550} width={320} sx={{
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "lightgray",
          borderRadius: "5px"
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#FB8C00",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#FB8C00",
        },
      }}
      >
        {!AdminNotification ? <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography>
            No new notifications
          </MDTypography>
        </Box> :
          AdminNotification?.map((data, id) => {
            return (
              <Stack key={data._id} direction={"row"} sx={{ cursor: "pointer" }} alignItems={'center'}

              >
                <IconButton size="medium">
                  <NotificationsIcon color={data.isRead ? "gray" : "warning"} />
                </IconButton>
                <Stack ml={.3} spacing={-0.6}>
                  {/* <MDTypography fontSize="14px" fontWeight="regular">
                  {data.notification.title}
                </MDTypography> */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Tooltip title={`${data.notification.message}`} arrow>
                      <Typography fontSize="13px" fontWeight="regular"
                        sx={{
                          // textWrap: "wrap",
                          // py: 1,
                          fontSize: "15px",
                          width: "240px",
                          py: 1,
                          overflow: "hidden", // Hides overflow content
                          whiteSpace: "nowrap", // Prevents text from wrapping
                          textOverflow: "ellipsis",
                        }}
                      >
                        {`${data.notification.message}`}
                      </Typography>
                    </Tooltip>
                    {/* <IconButton onClick={() => updateNotification(data._id)}> */}

                    <CloseIcon sx={{ ml: 1.3 }} onClick={() => updateNotification(data._id)} />
                    {/* </IconButton> */}
                  </Box>


                  <MDTypography fontSize="11px" fontWeight="regular">
                    {timeAgo(data.createdAt)}
                  </MDTypography>
                </Stack>
              </Stack>
            );
          })}
      </Stack>
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
  const logoutHandler = async () => {
    actionDispatcher(isLoading(true));

    try {
      const res = await apiService.getLogout();

      if (res?.data.success) {
        localStorage.removeItem("admin");
        actionDispatcher(logout());
        navigate("/authentication/sign-in", { replace: true });
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Logout successfully", "success"));
      }
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.error, "error"));
    }
  };
  const countUnreadNotifications = (notifications) => {
    return notifications?.filter(notification => !notification.isRead)?.length;
  }
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route?.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/* <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox> */}
            <MDBox color={light ? "white" : "inherit"}>
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                // onClick={() => navigate('/profile')}
                onClick={handleClick}
              >
                <Avatar src={FileUrl} />
                {/* <Icon sx={iconsStyle}>account_circle</Icon> */}
              </IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >

                <Stack spacing={.5} width={105} px={.7}>
                  <Box display={'flex'} alignItems={'center'} onClick={() => navigate('/profile')}>
                    <AccountCircleIcon sx={{ width: 25, height: 25, cursor: "pointer" }} />
                    <MDTypography fontSize="18px" sx={{ cursor: "pointer", ml: .5 }}>Profile</MDTypography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} px={.5} onClick={logoutHandler}>
                    <Stack spacing={0.5}>

                      <Box display={"flex"} alignItems={"center"} onClick={logoutHandler}>
                        <img
                          style={{ width: 22, height: 22, cursor: "pointer", }}
                          alt="logoutIcon"
                          src={logoutIcon}
                        />
                        <MDTypography sx={{ ml: 0.5, cursor: "pointer" }} fontSize="18px">
                          Logout
                        </MDTypography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Popover>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              {!AdminNotification ? <IconButton
                size="large"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <NotificationsIcon />
              </IconButton> : <IconButton
                size="large"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Badge color="primary" badgeContent={notificationLength}>
                  <NotificationsIcon />
                </Badge>
              </IconButton>}
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
