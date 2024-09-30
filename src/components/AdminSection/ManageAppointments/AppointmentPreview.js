import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import apiService from "components/ApiSevices/ApiServices";
import { Box, Grid, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

const AppointmentPreview = ({ open, handleClose, id }) => {
  const [data, setData] = useState({});
  const actionDispatcher = useDispatch();
  const [showFullText, setShowFullText] = useState(false);
  const getAppointment = async () => {
    try {
      const res = await apiService.getSingleAppointment(id);
      console.log("res", res);
      setData(res?.data?.appointmentData);
    } catch (error) {
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
    }
  };
  useEffect(() => {
    getAppointment();
  }, [id]);
  const timeFormater = (timeString) => {
    const date = new Date(timeString);
    // Extract date components
    const day = date.getUTCDate(); // Day of the month (1-31)
    const month = date.getUTCMonth() + 1; // Month (0-11), +1 to make it 1-indexed
    const year = date.getUTCFullYear(); // Year
    // Extract time components
    let hours = date.getUTCHours(); // Hours (0-23)
    const minutes = date.getUTCMinutes(); // Minutes (0-59)
    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    // Format the time in 12-hour format
    const formattedTime = `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;

    // Format the date
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;

    return `${formattedDate}, ${formattedTime}`;
  };
  console.log("Single data", data);
  return (
    <ModalComponent handleClose={handleClose} open={open}>
      <Stack spacing={2} width={400}>
        <Stack>
          <MDTypography fontWeight="bold">{`Username : ${
            data?.user == null ? "No Name" : data?.user?.userName
          }`}</MDTypography>
          <MDTypography fontWeight="regular">{`Date & Time : ${timeFormater(
            data?.appointmentTime
          )}`}</MDTypography>
          <MDTypography fontWeight="regular" textTransform="capitalize">{`User Type : ${
            data?.user == null ? "No userType" : data?.user?.userType
          }`}</MDTypography>
          <MDTypography fontWeight="regular" textTransform="capitalize">{`Phone Number : ${
            data?.user == null ? "No userType" : data?.user?.phoneNo
          }`}</MDTypography>
          <MDTypography fontWeight="regular" textTransform="capitalize">{`Preferred Location : ${
            data?.bookingLocation ? data?.bookingLocation : "N/A"
          }`}</MDTypography>
        </Stack>
        <Stack>
          <Box sx={{ display: "flex" }}>
            <MDTypography fontWeight="bold">Title : </MDTypography>
            <MDTypography
              sx={{
                width: "330px",
                textWrap: "wrap",
                ml: 0.5,
              }}
              fontWeight="regular"
            >
              {data?.title}
            </MDTypography>
          </Box>
          <Stack>
            <MDTypography fontWeight="bold">Problem </MDTypography>
            {`${data?.problem}`.length >= 120 ? (
              <MDTypography>
                {showFullText ? data?.problem : data?.problem.slice(0, 120)}...
                <span
                  onClick={() => setShowFullText(!showFullText)}
                  style={{
                    cursor: "pointer",
                    color: "rgba(106, 106, 106, 1)",
                    fontSize: "17.25px",
                    fontWeight: 400,
                  }}
                >
                  {showFullText ? " Read less" : " Read more"}
                </span>
              </MDTypography>
            ) : (
              <MDTypography>{data?.problem}</MDTypography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </ModalComponent>
  );
};
AppointmentPreview.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
};
export default AppointmentPreview;
