import { Icon } from "@iconify/react";
import { Height } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import { useNavigate } from "react-router-dom";

const NoRoutes = () => {
  const navigate = useNavigate()
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <MDTypography
            text="sm"
            width="100%"
            //   textAlign="center"
            sx={{ textAlign: "center", color: "error.main" }}
          >
            {/* <iconify-icon icon="nonicons:not-found-16"></iconify-icon> */}
            <Icon icon={"nonicons:not-found-16"} style={{fontSize:"40px"}} />
          </MDTypography>
          <MDBox
            sx={{
              marginRight: "1rem",
              width: "100%",
              display: "flex",
              //   justifyContent: "center",
              //   flexDirection: "column",
              alignItems: "center",
              //   height: "70vh",
              //   backgroundColor:"red"
            }}
          >
            <MDTypography
              text="sm"
              width="100%"
              //   textAlign="center"
              sx={{ textAlign: "center", color: "error.main" }}
            >
              No page found
            </MDTypography>
          </MDBox>
          <Stack mt={4} alignItems={"center"}>
            <Button
              variant="contained"
              sx={{
                color: "white !important",
                bgcolor: "#FF7518 !important",
                outlineColor: "#FF7518 !important",
                borderColor: "#FF7518",
              }}
              onClick={()=>navigate("/dashboard")}
            >
              Back To Dashboard Home
            </Button>
          </Stack>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default NoRoutes;
