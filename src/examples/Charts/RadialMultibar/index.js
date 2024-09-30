import Chart from "react-apexcharts";
import React, { useEffect } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import CountUp from "react-countup";

const colors = ["#00e396", "#008ffb", "#ff4560"];

const RadialMultiBarChart = ({ seriesData, labels }) => {
  const totalSeries = seriesData?.reduce((acc, val) => acc + val, 0);
  const percentSeries = seriesData.map((val) => (val / totalSeries) * 100);

  let chartData = {
    series: [...percentSeries],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              formatter: function (val) {
                return `${Math.round(val)}%`;
              },
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // Sum up all series
                const total = w.globals.seriesTotals.reduce((acc, curr) => acc + curr, 0);

                // Convert to "k" notation if total is 1000 or more
                return totalSeries;
              },
            },
          },
          track: {
            show: true,
            background: "#e7e7e7",
            strokeWidth: "100%",
            opacity: 1,
          },
        },
      },
      labels: labels,
      colors: [...colors],
    },
  };

  // useEffect(() => {}, [seriesData]);

  return (
    <>
      <Stack
        component={Paper}
        borderRadius={"15px"}
        elevation={4}
        py={1}
        px={1.5}
        alignItems={"center"}
      >
        <Stack
          width={"100%"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" fontSize={"14px"}>
            App Visitors
          </Typography>
          {/* <Button
            color="warning"
            size="small"
            sx={{ color: "white !important", backgroundColor: "orange" }}
            variant="contained"
          >
            Export
          </Button> */}
        </Stack>
        <Chart options={chartData.options} series={chartData.series} type="radialBar" width="300" />
        <Stack width={"100%"} px={2}>
          <List sx={{ width: "100%", lineHeight: "5px" }} dense>
            {[...labels].reverse().map((_e, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Typography variant="body2" fontWeight={"bold"} component={"span"}>
                        <CountUp end={Number(seriesData[labels.length - 1 - index])} duration={8} />
                        {/* {Number(seriesData[labels.length - 1 - index])} */}
                      </Typography>
                    }
                    sx={{ display: "flex", flexDirection: "row", alignItems: "ceneter" }}
                  >
                    <Box display="flex" alignItems="center">
                      <FiberManualRecordIcon
                        // color="primary"
                        sx={{ marginRight: "8px", height: "12px", color: colors[labels.length - 1 - index] }}
                      />
                      <Typography variant="body2" component="div" sx={{ fontSize: "14px" }}>
                        {_e}
                      </Typography>
                    </Box>
                  </ListItem>
                  {chartData?.options?.labels.length - 1 !== index ? <Divider /> : ""}
                </React.Fragment>
              );
            })}
          </List>
        </Stack>
      </Stack>
    </>
  );
};

RadialMultiBarChart.propTypes = {
  labels: PropTypes.array,
  seriesData: PropTypes.array,
};

export default RadialMultiBarChart;
