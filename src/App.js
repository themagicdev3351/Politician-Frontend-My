import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/apdoAbhimanui2.png";
import brandDark from "assets/images/apdoAbhimanui2.png";
import Loader from "components/MDLoder/Loader";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar, openSnackbar } from "./redux/action/defaultActions";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "./firebase";

// Routes All Components
import SignIn from "./layouts/authentication/sign-in";
import Resetpassword from "./layouts/authentication/reset-password";
import Verification from "layouts/authentication/otpVerification-auth/Verification";
import ForgotPassword from "layouts/authentication/ForgotPassword/ForgotPassword";
import CreatePostsHero from "./components/AdminSection/ManageFeeds/CreatePostsNews/CreatePostsHero";
import ManagePostHero from "./components/AdminSection/ManageFeeds/ManagePostNews/ManagePostHero";
import ViewPost from "./components/AdminSection/ManageFeeds/ManagePostNews/ViewPost";
import ViewNews from "components/AdminSection/ManageFeeds/ManagePostNews/ViewNews";
import ManageHashtag from "components/AdminSection/ManageFeeds/CreatePostsNews/ManageHashtag/ManageHashtag";
import CreateSocialMediaPosts from "components/AdminSection/ManageFeeds/CreateSocialMedia/CreateSocialMediaPosts";
import ManageSlots from "components/AdminSection/ManageAppointments/ManageSlots";
import AllAppointments from "components/AdminSection/ManageAppointments/AllAppointments";
import ViewSocialMedia from "components/AdminSection/ManageFeeds/ManagePostNews/ViewSocialMedia";
import MentorVerificationHero from "components/AdminSection/MentorShip/MentorShipVerification/MentorVerificationHero";
import AddAccount from "layouts/profile/add-account/AddAccount";
import { ManageUsers } from "components/AdminSection/ManageUsers/ManageUsers";
import SingleUserPreview from "components/AdminSection/ManageUsers/SingleUserPreview";
import AddBanner from "components/AdminSection/ManageFeeds/AddBanner/AddBanner";
import MentorShipProgramHero from "components/AdminSection/MentorShip/MentorShipProgram/MentorShipProgramHero";
import QueryManagement from "components/AdminSection/QueryManagement/QueryManagement";
import TermsAndCondition from "components/AdminSection/CMS/TermsAnd Conditions/TermsAndCondition";
import PrivacyAndPolicy from "components/AdminSection/CMS/PrivacyAndPolicy/PrivacyAndPolicy";
import EditPostCard from "components/AdminSection/ManageFeeds/CreatePostsNews/EditPostCard";

import AllCourses from "components/AdminSection/MentorShip/MentorShipProgram/AllCourses/AllCourses";
import NoRoutes from "layouts/dashboard/NoRoutes";
import axios from "axios";
import { login, logout } from "./redux/action/adminActions";
import { element } from "prop-types";
import { PartyWorkerHome } from "components/AdminSection/PartyWorker/PartyWorkerHome";
import EditNewsCard from "components/AdminSection/ManageFeeds/CreatePostsNews/EditNewsCard";
import PartyWorkerPreview from "components/AdminSection/PartyWorker/PartyWorkerPreview";

const customEqualityCheck = (prev, next) => {
  return prev.snackbar === next.snackbar && prev.admin === next.admin;
};

export default function App() {
  const navigate = useNavigate();
  const [FCMToken, setFCMToken] = useState("");
  const { snackbar, admin } = useSelector(
    (state) => ({
      snackbar: state.snackbar,
      admin: state.admin,
    }),
    customEqualityCheck
  );
  // console.log("admin=====>", admin);

  const actionDispatcher = useDispatch();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  axios.defaults.baseURL = 'http://ec2-3-110-87-15.ap-south-1.compute.amazonaws.com:5003';

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // close snackabar
  const handleClose = () => {
    actionDispatcher(closeSnackbar());
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  // const admin = JSON.parse(localStorage.getItem("admin"));

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="2.25rem"
      height="2.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right=".5rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  // Firebase Notification and Token logic
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const messaging = getMessaging(app);
      console.log('messaging')

      const requestNotificationPermission = async () => {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            console.log("Notification permission granted.");

            // Get FCM token
            const currentToken = await getToken(messaging, {
              vapidKey: "BHvO1WJl0_XN-gkZu_a9PCMzL2jHlpOSCTnWX59Ae04dQJzCNo2W2OqQ_FeoZoOC91lNMPlWj3WKkNPF5ncOeW0",
            });

            if (currentToken) {
              console.log("Token received: ", currentToken);
              setFCMToken(currentToken);
            } else {
              console.log("No registration token available.");
            }
          } else {
            console.error("Permission to notify was denied.");
          }
        } catch (error) {
          console.error("Error getting FCM token:", error);
        }
      };

      requestNotificationPermission();

      // Listen for incoming messages
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Message received: ", payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: "/bell.png",
        });
      });

      return () => {
        unsubscribe();
        setFCMToken("");
      };
    } else {
      console.error("This browser does not support notifications or service workers.");
    }
  }, []);

  const handleAuthenticate = async () => {
    try {
      const res = await axios.get("/api/v1/admin/authentication");
      if (res.data.success) {
        actionDispatcher(login());
      } else {
        actionDispatcher(logout());
        actionDispatcher(openSnackbar("please login", "error"));
        navigate("/authentication/sign-in", { replace: true });
      }
    } catch (error) {
      if (
        !error.response.data.success &&
        (error.response.data.message === "Unauthorized" ||
          error.response.data.message === "unauthorized")
      ) {
        actionDispatcher(logout());
        // actionDispatcher(openSnackbar("please login", "error"));
        navigate("/authentication/sign-in", { replace: true });
      }
      console.log("autherror=>", error);
    }
  };

  useEffect(() => {
    handleAuthenticate();
    // return () => {
    //   second
    // }
  }, []);

  useEffect(() => {

  }, [darkMode, transparentSidenav, sidenavColor]);

  return (
    <>
      <Loader />
      <Snackbar
        open={snackbar?.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackbar?.severity}
          sx={{ width: "100%" }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
      <ThemeProvider
        //  theme={darkMode ? themeDark : theme}
        theme={theme}
      >
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName=""
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* <Configurator />
            {configsButton} */}
          </>
        )}
        <Routes>
          {getRoutes(routes)}
          <Route
            path="/"
            element={
              admin && admin?.isLoggedIn && admin?.isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/authentication/sign-in" />
              )
            }
          />
          {!admin?.isLoggedIn && !admin?.isAuthenticated ? (
            <>
              <Route path="/authentication/sign-in" element={<SignIn FCMToken={FCMToken} />} />
              <Route path="/authentication/forgotPassword" element={<Resetpassword />} />
              <Route path="/authentication/optVerification" element={<Verification />} />
              <Route path="/authentication/resetPassword" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/authentication/sign-in" />} />

              {/* <Route path="/authentication/forget-password/:token" element={<ForgetPassword />} />
            <Route path="/authentication/reset-password" element={<ResetPassword />} /> */}
            </>
          ) : admin && admin?.isLoggedIn && admin?.isAuthenticated ? (
            <>
              <Route path="/CreatePosts" element={<CreatePostsHero />} />
              <Route path="/EditPost/:postId" element={<EditPostCard />} />
              <Route path="/ManagePost" element={<ManagePostHero />} />
              <Route path="/CreateYoutubePosts" element={<CreateSocialMediaPosts />} />
              <Route path="/ManagePost/viewPost" element={<ViewPost />} />
              <Route path="/ManagePost/viewNews" element={<ViewNews />} />
              <Route path="/EditNews/:newsId" element={<EditNewsCard />} />
              <Route path="/ManageHashtag" element={<ManageHashtag />} />
              <Route path="/ManageSlots" element={<ManageSlots />} />
              <Route path="/AllAppointments" element={<AllAppointments />} />
              <Route path="/ManagePost/viewyoutubepost" element={<ViewSocialMedia />} />
              <Route path="/MentorShipVerification" element={<MentorVerificationHero />} />
              <Route path="/MentorShipProgram" element={<MentorShipProgramHero />} />
              <Route path="/MentorShipProgram/allCourses" element={<AllCourses />} />
              <Route path="/AddAccount" element={<AddAccount />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/SingleUserPreview" element={<SingleUserPreview />} />
              <Route path="/PartyWorkerPreview" element={<PartyWorkerPreview />} />
              <Route path="/AddBanner" element={<AddBanner />} />
              <Route path="/QueryManagement" element={<QueryManagement />} />
              <Route path="/PartyWorker" element={<PartyWorkerHome />} />
              <Route path="/PrivacyAndPolicy" element={<PrivacyAndPolicy />} />
              <Route path="/TermsAndConditions" element={<TermsAndCondition />} />
              <Route path="*" element={<NoRoutes />} />
            </>
          ) : (
            <Navigate to="/authentication/sign-in" />
          )}
        </Routes>
      </ThemeProvider>
    </>
  );
}
