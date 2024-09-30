/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";

// Data
import data from "layouts/dashboard/components/RecentlyAddedUsers/data";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { isLoading } from "../../../../redux/action/defaultActions";
import axios from "axios";

function RecentlyAddedUsers() {
  const actionDispatcher = useDispatch();
  const [recentUserData, setrecentUserData] = useState(null);

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  // const get user data values
  const getRecentUsersData = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.get("/api/v1/admin/get/recent/users");
     
      setrecentUserData(res.data.data);
      actionDispatcher(isLoading(false));
    } catch (error) {
      console.log("error=>", error);
      actionDispatcher(isLoading(false));
    }
  };

  useEffect(() => {
    getRecentUsersData();
    // return () => {
    //   second
    // }
  }, []);

  const { columns, rows } =
    recentUserData && recentUserData.usersRegisteredLastMonth.length > 0
      ? data(recentUserData.usersRegisteredLastMonth)
      : { columns: [], rows: [] };

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Recent Users
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong> + {recentUserData?.recentUsers} users</strong> newly added this month
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox> */}
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={true}
          // canSearch={true}
        />
      </MDBox>
    </Card>
  );
}

// function formatTableData(coulumData) {
//   const avatars = (members) =>
//     members.map(([image, name]) => (
//       <Tooltip key={name} title={name} placeholder="bottom">
//         <MDAvatar
//           src={image}
//           alt="name"
//           size="xs"
//           sx={{
//             border: ({ borders: { borderWidth }, palette: { white } }) =>
//               `${borderWidth[2]} solid ${white.main}`,
//             cursor: "pointer",
//             position: "relative",

//             "&:not(:first-of-type)": {
//               ml: -1.25,
//             },

//             "&:hover, &:focus": {
//               zIndex: "10",
//             },
//           }}
//         />
//       </Tooltip>
//     ));

//   const Company = ({ image, email }) => (
//     <MDBox width="10rem">
//       {/* <MDAvatar src={image} name={email} size="sm" /> */}
//       <MDTypography variant="caption" fontWeight="medium">
//         {email}
//       </MDTypography>
//       {/* <Typography color={"primary"} sx={{color:"red"}} >{email}</Typography> */}
//     </MDBox>
//   );

//   return {
//     columns: [
//       { Header: "Full Name", accessor: "fullName", width: "30%", align: "left" },
//       { Header: "Email", accessor: "email", align: "left" },
//       { Header: "Gender", accessor: "gender", align: "center" },
//       { Header: "Age Category(DOB)", accessor: "ageCategory", align: "center" },
//       { Header: "Status", accessor: "status", align: "center" },
//       { Header: "User Type", accessor: "userType", align: "center" },
//       // { Header: "ageCategory", accessor: "completion", align: "center" },
//     ],

//     rows: coulumData?.map((el, index) => ({
//       fullName: (
//         <MDBox textAlign="left" display="flex" flexDirection="row" alignItems="center">
//           <MDAvatar src={logoXD} name={"jhon"} size="sm" />
//           <MDTypography fontWeight="medium" variant="button" lineHeight={1} color="text" ml={1}>
//             John Doe
//           </MDTypography>
//         </MDBox>
//       ),
//       email: <Company image={logoXD} email="username@123" />,
//       gender: (
//         <MDBox width="6rem" textAlign="center">
//           <MDTypography variant="caption" color="text" fontWeight="medium">
//             Male
//           </MDTypography>
//         </MDBox>
//       ),
//       ageCategory: (
//         <MDBox width="8rem" textAlign="left">
//           <MDProgress value={60} color="info" variant="gradient" label={false} />
//         </MDBox>
//       ),
//       status: (
//         <MDBox width="6rem" textAlign="center">
//           <Chip
//             variant="primary"
//             sx={{ bgcolor: "orange", borderRadius: "2px", px: 1 }}
//             label="active"
//             size="small"
//           />
//         </MDBox>
//       ),
//       userType: (
//         <MDBox width="10rem" textAlign="center">
//           <MDTypography variant="caption" color="text" fontWeight="medium">
//             Party Worker
//           </MDTypography>
//         </MDBox>
//       ),
//     })),
//   };
// }

export default RecentlyAddedUsers;
