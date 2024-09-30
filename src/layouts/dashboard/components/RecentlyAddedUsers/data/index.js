/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";

import { Box, Chip, Typography } from "@mui/material";
import dayjs from "dayjs";

export default function data(userData) {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const EmailField = ({ email }) => (
    <MDBox width="10rem">
      {/* <MDAvatar src={image} name={email} size="sm" /> */}
      <MDTypography variant="caption" fontWeight="medium">
        {email}
      </MDTypography>
      {/* <Typography color={"primary"} sx={{color:"red"}} >{email}</Typography> */}
    </MDBox>
  );

  return {
    columns: [
      { Header: "Full Name", accessor: "fullName", width: "30%", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Gender", accessor: "gender", align: "center" },
      { Header: "Age Category(DOB)", accessor: "ageCategory", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "User Type", accessor: "userType", align: "center" },
      // { Header: "ageCategory", accessor: "completion", align: "center" },
    ],

    rows:
      userData &&
      userData?.map((el, index) => ({
        fullName: (
          <MDBox textAlign="left" display="flex" flexDirection="row" alignItems="center">
            <MDAvatar src={el?.profileImg?.url} name={el?.userName} size="md" />
            <MDTypography fontWeight="medium" variant="button" lineHeight={1} color="text" ml={2}>
              {el?.userName}
            </MDTypography>
          </MDBox>
        ),
        email: <EmailField email={el?.email ? el?.email : "N/A"} />,
        gender: (
          <MDBox width="6rem" textAlign="center">
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {el?.gender}
            </MDTypography>
          </MDBox>
        ),
        ageCategory: (
          <MDBox width="8rem" textAlign="center">
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {dayjs(el?.dateOfBirth).format("DD/MM/YYYY")}
              {/* {el?.dateOfBirth} */}
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox width="6rem" textAlign="center">
            <Chip
              variant="primary"
              sx={{
                bgcolor: el?.isActive ? "orange" : "maroon",
                borderRadius: "2px",
                px: 1,
                color: "white !important",
                width: "100%",
              }}
              label={el?.isActive ? "Active" : "Inactive"}
              size="small"
            />
          </MDBox>
        ),
        userType: (
          <MDBox width="10rem" textAlign="center">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              sx={{ textTransform: "capitalize" }}
            >
              {el?.userType}
            </MDTypography>
          </MDBox>
        ),
      })),
  };
}
