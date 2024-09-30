// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import ManagePostHero from "components/AdminSection/ManageFeeds/ManagePostNews/ManagePostHero";
import CreatePostsHero from "components/AdminSection/ManageFeeds/CreatePostsNews/CreatePostsHero";
import ManageHashtag from "components/AdminSection/ManageFeeds/CreatePostsNews/ManageHashtag/ManageHashtag";
import CreateSocialMediaPosts from "components/AdminSection/ManageFeeds/CreateSocialMedia/CreateSocialMediaPosts";
import AllAppointments from "components/AdminSection/ManageAppointments/AllAppointments";
import MentorVerificationHero from "components/AdminSection/MentorShip/MentorShipVerification/MentorVerificationHero";
import ManageSlots from "components/AdminSection/ManageAppointments/ManageSlots";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { ManageUsers } from "components/AdminSection/ManageUsers/ManageUsers";
import GroupIcon from "@mui/icons-material/Group";
import AddBanner from "components/AdminSection/ManageFeeds/AddBanner/AddBanner";
import MentorShipProgramHero from "components/AdminSection/MentorShip/MentorShipProgram/MentorShipProgramHero";
import Groups2Icon from "@mui/icons-material/Groups2";
import settingsIcon from "../src/assets/images/settings.png";
import UserNotification from "../src/assets/images/userVerification.png";
import UserVerification from "../src/assets/images/icons/user-verification.svg"
import QueryManagement from "components/AdminSection/QueryManagement/QueryManagement";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import TermsAndCondition from "components/AdminSection/CMS/TermsAnd Conditions/TermsAndCondition";
import PrivacyAndPolicy from "components/AdminSection/CMS/PrivacyAndPolicy/PrivacyAndPolicy";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { PartyWorkerHome } from "components/AdminSection/PartyWorker/PartyWorkerHome";
const UserNotificationIcon = () => {
  return <img
    alt="user Notification "
    src={UserNotification}
  />
}
const routes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Manage Users",
    key: "ManageUsers",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/ManageUsers",
    component: <ManageUsers />,
  },
  {
    type: "collapse",
    name: "User Verification",
    key: "User verification",
    icon: <img
      style={{
        filter: 'sepia(1) hue-rotate(180deg) saturate(400%) brightness(0)',
      }}
      alt="user Notification "
      // src={UserNotification}
      src={UserVerification}
    />,
    // icon: <Icon fontSize="small">badge</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "Mentor Verification",
        key: "mentorVerification",
        route: "/MentorShipVerification",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <MentorVerificationHero />,
      },
      {
        type: "route",
        name: "Party Worker Verification",
        key: "PartyWorker",
        route: "/PartyWorker",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <PartyWorkerHome />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Manage Feed",
    key: "ManageFeed",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "Create Posts/News",
        key: "CreatePostsNews",
        route: "/CreatePosts",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <CreatePostsHero />,
      },
      {
        type: "route",
        name: "Post Youtube videos",
        key: "CreateYoutubePosts",
        route: "/CreateYoutubePosts",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <CreateSocialMediaPosts />,
      },
      {
        type: "route",
        name: "Manage Post/News ",
        key: "ManagePost/News ",
        route: "/ManagePost",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <ManagePostHero />,
      },
      {
        type: "route",
        name: "Manage Hashtags",
        key: "ManageHashtags",
        route: "/ManageHashtag",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <ManageHashtag />,
      },
      {
        type: "route",
        name: "Add Banner",
        key: "AddBanner",
        route: "/AddBanner",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <AddBanner />,
      },
    ],
  },

  // {
  //   type: "collapse",
  //   name: "Mentor Verification",
  //   key: "mentorVerification",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/MentorShipVerification",
  //   component: <MentorVerificationHero />,
  // },
  {
    type: "collapse",
    name: "Mentorship Program",
    key: "mentorshipProgram",
    icon: <Icon fontSize="small">groups</Icon>,
    subRoutes: [
      {
        type: "routes",
        name: "Mentorship",
        key: "Mentorship",
        icon: <Icon fontSize="small">groups</Icon>,
        route: "/MentorShipProgram",
        component: <MentorShipProgramHero />,
      },
      {
        type: "routes",
        name: "All Courses",
        key: "allCourses",
        icon: <GroupIcon />,
        route: "/MentorShipProgram/allCourses",
        component: <ManageUsers />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Manage Appointments",
    key: "ManageAppointments",
    // icon: <AssignmentIndIcon />,
    icon: <Icon fontSize="small">assignment_ind</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "All Appointments",
        key: "AllAppointments",
        route: "/AllAppointments",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <AllAppointments />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Query Management",
    key: "QueryManagement",
    route: "/QueryManagement",
    // icon: <ManageHistoryIcon />,
    icon: <Icon fontSize="small">manage_history</Icon>,
    component: <QueryManagement />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "CMS",
    key: "CMS",
    // 
    icon: <Icon fontSize="small">newspaper</Icon>,
    subRoutes: [
      {
        type: "route",
        name: "Privacy And Policy",
        key: "PrivacyAndPolicy",
        route: "/PrivacyAndPolicy",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <PrivacyAndPolicy />,
      },
      {
        type: "route",
        name: "Terms And Conditions",
        key: "TermsAndConditions",
        route: "/TermsAndConditions",
        icon: <Icon fontSize="small">receipt_long</Icon>,
        component: <TermsAndCondition />,
      },
    ],
  },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },

];

export default routes;
