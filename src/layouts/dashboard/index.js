// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import RecentlyAddedUsers from "layouts/dashboard/components/RecentlyAddedUsers";

import RadialMultiBarChart from "examples/Charts/RadialMultibar";

import DoughnutDashboardChart from "examples/Charts/Doughnut";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [dashboardUserStats, setdashboardUserStats] = useState({});
  const [totalUserStats, setTotalUserStats] = useState(null);
  const [userAppointementStats, setuserAppointementStats] = useState(null);

  // get dashboard usetype stats
  const getDashboardUserStats = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/all/user/stats");

      setdashboardUserStats(res.data.data);
    } catch (error) {
      console.log("error=>", error);
    }
  };

  // get total user stats
  const getTotalUserStats = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/users/activation/stats");
      setTotalUserStats(res?.data?.data);
    } catch (error) {
      console.log("error=>", error);
    }
  };

  // get app visitors data
  const getAppVisitorsData = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/users/appointment/stats");
      console.log("respionse==?=>", res);
      setuserAppointementStats(res.data.data);
    } catch (error) {
      console.log("erro=>", error);
    }
  };
  // ----------------------------------------
  useEffect(() => {
    getDashboardUserStats();
    getTotalUserStats();
    getAppVisitorsData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="people"
                title="Public"
                count={dashboardUserStats?.public?.number ? dashboardUserStats?.public?.number : 0}
                percentage={{
                  color: "success",
                  amount: `${dashboardUserStats?.public?.percentage.toFixed(0)}%`,
                  label: "of total user",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="diversity_1"
                title="Party Workers"
                count={
                  dashboardUserStats?.partyWorker?.number
                    ? dashboardUserStats?.partyWorker?.number
                    : 0
                }
                percentage={{
                  color: "success",
                  amount: `${dashboardUserStats?.partyWorker?.percentage.toFixed(0)}%`,
                  label: "of total user",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="psychology"
                title="Mentors"
                count={dashboardUserStats?.mentor?.number ? dashboardUserStats?.mentor?.number : 0}
                percentage={{
                  color: "success",
                  amount: `${dashboardUserStats?.mentor?.percentage.toFixed(0)}%`,
                  label: "of total user",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="school"
                title="Students"
                count={
                  dashboardUserStats?.student?.number ? dashboardUserStats?.student?.number : 0
                }
                percentage={{
                  color: "success",
                  amount: `${dashboardUserStats?.student?.percentage.toFixed(0)}%`,
                  label: "of total user",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <MDBox mb={3}>
                {userAppointementStats ? (
                  <RadialMultiBarChart
                    seriesData={[
                      userAppointementStats.allAppointments,
                      userAppointementStats?.pendingAppointments,
                      userAppointementStats.todaysAppointments,
                    ]}
                    labels={["All Appointments", "Pending Appointments", "Today’s Appointments"]}
                  />
                ) : (
                  ""
                )}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
              <MDBox mb={3}>
                {totalUserStats ? (
                  <DoughnutDashboardChart
                    // data={
                    //   totalUserStats
                    //     ? totalUserStats
                    //     : {
                    //         activeUsers: 0,
                    //         deactiveUsers: 0,
                    //         usersRegisteredLastMonth: 0,
                    //       }
                    // }

                    seriesData={[
                      totalUserStats?.activeUsers,
                      totalUserStats?.deactiveUsers,
                      totalUserStats?.usersRegisteredLastMonth,
                    ]}
                    labels={["Active Users", "Deactivated Users", "New Users"]}
                  />
                ) : (
                  <></>
                )}
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <RecentlyAddedUsers />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
