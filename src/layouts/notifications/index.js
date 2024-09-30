

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import apiService from "components/ApiSevices/ApiServices";
import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [AdminNotification, setAdminNotification] = useState([]);

  const getNotification = async () => {
    try {
      const res = await apiService.getAllNotification();
      setAdminNotification(res?.data.allNotifications);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getNotification();
  }, []);
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <MDBox p={2}>
          <MDTypography variant="h5" fontWeight="medium">Notifications</MDTypography>
        </MDBox>
        <Grid columnGap={0.75} container rowGap={1} flexWrap={'wrap'} sx={{ overflowY: "auto",
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
        }}>
          {AdminNotification?.map((data, id) => {
            return <Grid key={data._id} item xs={12} sm={5.5} lg={3.9}>
              <Box p={1.5} py={2} component={Paper} sx={{ bgcolor: data.isRead ? "#F8DE8E" : "#B7E0A6" }}>
                <Stack key={data._id}>
                  <Tooltip title={`${data.notification.message}`} arrow>
                    <Typography fontSize="13px" fontWeight="regular">
                      {`${data.notification.message}`}
                    </Typography>
                  </Tooltip>
                  <Typography fontSize="11px" fontWeight="regular" sx={{ color: "white" }}>
                    {timeAgo(data.createdAt)}
                  </Typography>
                </Stack>

              </Box>



            </Grid>
          })}
          {/* <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2} lineHeight={0}>
                <MDTypography variant="h5">Notifications</MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </MDTypography>
              </MDBox>
              <MDBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </MDButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </MDButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </MDButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </MDButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Notifications;
