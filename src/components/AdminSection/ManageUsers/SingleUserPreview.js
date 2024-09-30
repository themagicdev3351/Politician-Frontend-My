import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import apiService from "components/ApiSevices/ApiServices";
import { Avatar, Box, Divider, Grid, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

const SingleUserPreview = () => {
  const { state } = useLocation();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await apiService?.getSingleUser(state.active.id);
      setData(res?.userData);
    } catch (error) {
      console.log("error", error);
      dispatch(
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
    getUser();
  }, [state.active.id]);
  const handleClose = () => {
    navigate(-1);
  };
  const timeFormater = (date) => {
    const currentTime = dayjs(date);
    const formattedTime = currentTime.format("h:mm A");
    const formatedDate = currentTime.format("DD-MM-YYYY");

    return `${formatedDate.split("-")[2]}`;
  };
  const agetimeFormater = (date) => {
    const currentTime = dayjs(date);
    const formattedTime = currentTime.format("h:mm A");
    const formatedDate = currentTime.format("DD-MM-YYYY");

    return `${formatedDate}`;
  };
  // console.log("res", data);

  return (
    <ModalComponent open={true} handleClose={handleClose}>
      {/* {state.active.id} */}
      <Grid container width={420} rowGap={2}>
        <Grid item xs={12}>
          <Stack direction={"row"} columnGap={3}>
            <Stack
              spacing={1}
              sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Avatar src={data?.profileImg?.url} sx={{ width: "95px", height: "95px" }} />
              <MDTypography fontSize="16px">{data.userName}</MDTypography>
            </Stack>
            <Stack spacing={0.3}>
              <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                <MDTypography fontWeight="regular" textTransform="uppercase">
                  {data?.userType ? data?.userType : "Admin"}
                </MDTypography>
                {data?.userType !== "party worker" && (
                  <MDTypography sx={{ ml: 5 }} fontSize="12px" textTransform="capitalize">
                    Active since : {timeFormater(data?.createdAt)}
                  </MDTypography>
                )}
              </Box>
              {data?.userType === "party worker" && (
                <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
                  <MDTypography fontSize="12px" textTransform="capitalize">
                    Active since : {timeFormater(data?.createdAt)}
                  </MDTypography>
                </Box>
              )}
              <Box ml={1}>
                {data?.userType === "mentor" && (
                  <MDTypography fontWeight="regular" fontSize="14px" textTransform="capitalize">
                    Specialization : {data?.specialization}
                  </MDTypography>
                )}
                {data?.userType === "student" && (
                  <MDTypography fontWeight="regular" fontSize="14px" textTransform="capitalize">
                    Specialization : {data?.studyField}
                  </MDTypography>
                )}
                {data?.userType === "admin" && (
                  <MDTypography fontWeight="regular" fontSize="14px" textTransform="capitalize">
                    Specialization : {data?.studyField}
                  </MDTypography>
                )}
              </Box>
              {data?.userType && (
                <Box ml={1} mt={4}>
                  <MDTypography fontWeight="regular" fontSize="14px" textTransform="capitalize">
                    Status : {data?.isActive ? "Active" : "Deactive"}
                  </MDTypography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Divider orientation="horizontal" sx={{ backgroundColor: "black", mt: 3 }} />

        <Grid item xs={12}>
          <MDTypography fontWeight="medium" fontSize="16px">
            User Account Details
          </MDTypography>
          <Stack spacing={1} mt={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography fontSize="16px" textTransform="capitalize">
                Date of Birth
              </MDTypography>
              <Box sx={{ width: "280px" }}>
                <MDTypography fontSize="16px" textTransform="capitalize">
                  {agetimeFormater(data?.dateOfBirth)}
                </MDTypography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography fontSize="16px" textTransform="capitalize">
                Mobile Number
              </MDTypography>
              <Box sx={{ width: "280px" }}>
                <MDTypography fontSize="16px" textTransform="capitalize">
                  {data?.phoneNo ? data?.phoneNo : "N/A"}
                </MDTypography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography fontSize="16px" textTransform="capitalize">
                Email
              </MDTypography>
              <Box sx={{ width: "280px" }}>
                <MDTypography fontSize="16px">
                  {data?.email == null ? "N/A" : data?.email}
                </MDTypography>
              </Box>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <MDTypography fontSize="16px" textTransform="capitalize">Last Active On</MDTypography>
                            <Box sx={{ width: "180px" }}>
                                <MDTypography fontSize="16px" textTransform="capitalize">{data?.email == null ? "No email" : data?.email}</MDTypography>
                            </Box>
                        </Box> */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography fontSize="16px" textTransform="capitalize">
                Constituency
              </MDTypography>
              <Box sx={{ width: "280px" }}>
                <MDTypography fontSize="16px" textTransform="capitalize">
                  {data?.constituentAssembly == null ? "Not Found" : data?.constituentAssembly}
                </MDTypography>
              </Box>
              {/* {data.userType === "mentor" || data.userType === "student" ? (
                <Box sx={{ width: "180px" }}>
                  <MDTypography fontSize="16px" textTransform="capitalize">
                    {data?.constituentAssembly == null ? "Not Found" : data?.constituentAssembly}
                  </MDTypography>
                </Box>
              ) : data?.location ? (
                <Box sx={{ width: "180px" }}>
                  <MDTypography fontSize="16px" textTransform="capitalize">
                    {data?.location == null ? "No email" : data?.location}
                  </MDTypography>
                </Box>
              ) : (
                <Box sx={{ width: "180px" }}>
                  <MDTypography fontSize="16px" textTransform="capitalize">
                    Location not found
                  </MDTypography>
                </Box>
              )} */}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};
export default SingleUserPreview;
