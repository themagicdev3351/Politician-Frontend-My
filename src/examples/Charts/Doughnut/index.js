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

const colors = ["#00e396", "#ff4560", "#008ffb"];
const DoughnutDashboardChart = ({ seriesData, labels }) => {
  const chartData = {
    series: seriesData,
    options: {
      chart: {
        width: 800,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                position: "bottom",
                label: "All App Users",
                formatter: () => `${seriesData?.slice(0, 2).reduce((a, b) => a + b, 0)}`, // Calculate the total
              },
            },
            size: "80%",
          },
        },
      },
      colors: colors,
      stroke: {
        width: 3, // Set the strokeWidth to 0 to remove separators
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          const total = seriesData ? seriesData?.reduce((a, b) => a + b, 0) : 0;
          return total ? val.toFixed(0) + "%" : "0%";
        },
        style: {
          fontSize: "14px",
        },
        dropShadow: {
          enabled: false,
          top: 1.5,
          left: 1.5,
          blur: 1,
          opacity: 0.45,
        },
      },
      // fill: {
      //   type: "gradient",
      // },
      labels: labels, // Dynamic labels
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#FF4560",
              },
              text: "Bananas: 44",
            },
          },
          {
            x: "Apples",
            seriesIndex: 1,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Apples: 55",
            },
          },
          // Add more annotations for other segments
        ],
      },

      legend: {
        show: false,
        position: "right",
        horizontalAlign: "left", // Align legends in a column
        markers: {
          width: 10,
          height: 10,
          radius: 10, // Square boxes
        },
        formatter: function (seriesName, opts) {
          const value = opts.w.globals.series[opts.seriesIndex]; // Get value from series data
          return `${seriesName}: ${value}`; // Format legend as "Label: Value"
        },
      },
      title: {
        text: "",
      },
    },
  };

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
            Total User Stats
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
        {chartData && (
          <Chart options={chartData?.options} series={chartData?.series} type="donut" width="350" />
        )}

        <Stack mt={"-30px"} width={"100%"} px={3}>
          <List sx={{ width: "100%", lineHeight: "5px" }} dense>
            {labels?.map((_e, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      // Number(seriesData[labels.length - 1 - index])
                      // <CountUp end={Number(seriesData[index])} duration={8} />
                      <Typography variant="body2" fontWeight={"bold"} component={"span"}>
                       <CountUp end={Number(seriesData[index])} duration={8} />
                      </Typography>
                    }
                    sx={{ display: "flex", flexDirection: "row", alignItems: "ceneter" }}
                  >
                    <Box display="flex" alignItems="center">
                      <FiberManualRecordIcon
                        // color="primary"
                        sx={{
                          marginRight: "8px",
                          height: "12px",
                          color: colors[seriesData.length - 1 - index],
                        }}
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

DoughnutDashboardChart.propTypes = {
  seriesData: PropTypes.array,
  labels: PropTypes.array,
};

export default DoughnutDashboardChart;
