import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezoneIana from 'dayjs-timezone-iana-plugin';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
// import { isLoading, openSnackbar } from '../../../../redux/action/defaultActions';
import NodataFound from "examples/NotFoundPage/NodataFound";
import Table from "examples/ReusableTable/Table";
import { useEffect, useState } from "react";
import CustomToolbar from "examples/CustomToolbar/CustomToolbar";
import apiService from "components/ApiSevices/ApiServices";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { openSnackbar } from "../../../redux/action/defaultActions";
import AppointmentPreview from "./AppointmentPreview";
import SetMessage from "./SetMessage";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

dayjs.extend(utc);
dayjs.extend(timezoneIana);

const AllAppointments = () => {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState({ value: "", id: "" });
  const [preview, setPreview] = useState({ open: false, id: "" });
  // FOr pagination
  const [paginationData, setPaginationData] = useState({
    limitPerPage: 5,
    totalData: 17,
    totalPages: 4,
    currentPage: 1,
  });
  // console.log("pagination data", paginationData)
  const getAppointments = async (e) => {
    try {
      const res = await apiService.getAllAppointments(paginationData);
      setPaginationData(res?.data.pageInfo);
      setAppointments(res?.data.allAppointmentRequests);
      console.log("get all Appointments", res);
    } catch (error) {
      dispatch(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
      } else {
        // Something else happened in setting up the request
        console.error("Error", error.message);
      }
    }
  };
  useEffect(() => {
    getAppointments();
  }, [paginationData.currentPage, paginationData.limitPerPage]);
  // To Open View Profile and delete Popover
  const [anchorEl, setAnchorEl] = useState(null);
  // To open delete modal
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      appointmentId: null,
    },
  });
  // To change pagination
  const changePage = (currentPage) => {
    setPaginationData({ ...paginationData, currentPage });
  };
  // to close the popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  // It is using in popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //  to format the time
  const timeFormater = (date) => {
    const [datePart, timePart] = date.replace('Z', '').split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');
    // Convert hours to 12-hour format and determine AM/PM
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    // Format the time in 12-hour format
    const formattedTime = `${hour12}:${minutes} ${period}`;

    // Format the date
    const formattedDate = `${day}-${month}-${year}`;



    return `${formattedDate}, ${formattedTime}`;
  };
  const changePageSize = (limitPerPage) => {
    setPaginationData({ ...paginationData, currentPage: 1, limitPerPage });
  };
  const handleClose = () => {
    setAnchorEl(null);

    setDialog({
      open: false,
      title: "",
      message: "",
      buttonText: "",
    });
  };
  const handleClick = (event, _id, status) => {
    setStatus({ ...status, id: _id });

    setAnchorEl(event.currentTarget);
  };

  const processData = (data) => {
    return data.map((item, index) => ({
      ...item,
      index:
        index +
        paginationData.currentPage * paginationData.limitPerPage -
        paginationData.limitPerPage +
        1, // Add 1 to start index from 1
    }));
  };

  const rows = processData(appointments);
  const columns = [
    {
      field: "index",
      headerName: <MDTypography fontSize="15px">Sr.No</MDTypography>,
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        // console.log("params", params)
        return (
          <MDTypography
            fontSize="15px"
            sx={{
              py: 1.8,
            }}
          >
            {params.value}
          </MDTypography>
        );
      },
    },
    {
      field: "user",
      headerName: <MDTypography fontSize="15px">User Name</MDTypography>,
      width: 200,
      // Height:"auto",
      // // valueGetter: (params) => params.value,
      valueGetter: (value) => {
        // console.log("====>",params)
        return value?.userName || "No Name";
      },
      // renderCell: ({value}) => {
      //   console.log("user", value)
      //   return (
      //     <>
      //       <MDTypography
      //         sx={{
      //           // ml: .5,
      //           fontSize: "15px",
      //           // width: "230px",
      //           textWrap: "wrap",
      //           py: 1.8,
      //           // height: 25
      //         }}
      //       >
      //         {value == null ? "No Name" : value?.userName}
      //       </MDTypography>
      //     </>
      //   );
      // },
    },
    {
      field: "#userType",
      headerName: <MDTypography fontSize="15px">User Type</MDTypography>,
      width: 120,
      renderCell: (params) => {
        // console.log("userType", params.row)
        return (
          <MDTypography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              py: 1.8,
            }}
          >
            {params.row.user == null ? "No UserType" : params.row.user.userType}
          </MDTypography>
        );
      },
    },
    {
      field: "title",
      headerName: <MDTypography fontSize="15px">Agenda</MDTypography>,
      width: 230,
      // Height:"auto",
      // valueGetter: (params) => params.value,
      renderCell: (params) => {
        // console.log("business private post table", params)
        return (
          <>
            <MDTypography
              sx={{
                // ml: .5,
                fontSize: "15px",
                width: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                py: 1.8,
                // height: 25
              }}
            >
              {params.value}
            </MDTypography>
          </>
        );
      },
    },
    {
      field: "appointmentDate",
      headerName: <MDTypography fontSize="15px">Booking Time</MDTypography>,
      width: 180,
      renderCell: (params) => {
        // console.log("appointment time", params.row)
        return (
          <MDBox sx={{ py: 1.8 }}>
            <MDTypography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
              }}
            >{timeFormater(params?.row?.appointmentTime)}
              {/* {`${dayjs(params?.value).format("DD-MM-YYYY")}  ${dayjs(
                params?.row?.appointmentTime
              ).format("h:mm A")}`} */}
            </MDTypography>
          </MDBox>
        );
      },
    },
    {
      field: "Preview",
      headerName: <MDTypography fontSize="15px">Preview</MDTypography>,
      width: 90,
      // align: "center",
      renderCell: (params) => {
        return (
          <MDTypography
            sx={{
              fontSize: "15.33px",
              fontWeight: "400",
              color: "#FF8906",
              cursor: "pointer",
              py: 1.6,
            }}
            onClick={() => setPreview({ open: true, id: params.row._id })}
          >
            View
          </MDTypography>
        );
      },
    },
    {
      field: "status",
      headerName: <MDTypography fontSize="15px">Status</MDTypography>,
      width: 120,
      // align: "center",
      // headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <MDBox width="100%">
              <Chip
                label={params.value}
                color={`${params.value === "approved"
                  ? "success"
                  : params.value === "pending"
                    ? "warning"
                    : "error"
                  }`}
                size="small"
                sx={{
                  color: "white !important",
                  //   fontSize: "14px",
                  //   fontWeight: "400",
                  //   bgcolor:
                  //     params.value === "approved"
                  //       ? "rgba(211, 255, 207, 1)"
                  //       : params.value === "pending"
                  //       ? "rgba(255, 207, 143, 1)"
                  //       : "rgba(255, 217, 217, 1)",
                  borderRadius: "5px",
                  minWidth: "6rem",
                  textAlign: "center",
                }}
              />
            </MDBox>
          </>
        );
      },
    },
    {
      field: "Action",
      headerName: <MDTypography fontSize="15px">Action</MDTypography>,
      width: 120,
      renderCell: (params) => {
        // console.log("params", params)
        return (
          <>
            <IconButton
              disabled={params.row.status === "pending" ? false : true}
              sx={{
                fontSize: "20.33px",
                fontWeight: "400",
                cursor: "pointer",
                py: 1.6,
              }}
              onClick={(e) => handleClick(e, params.row._id)}
            >
              {/* {params.row.status === "pending" ? ( */}
              <MoreVertIcon />
              {/* ) : (
                <MDTypography fontSize="14px">N/A</MDTypography>
              )} */}
            </IconButton>
            <Popover
              id={id}
              elevation={3}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              // anchorReference="anchorPosition"
              // anchorPosition={{ top: 415, left: 1160 }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Stack
                direction={"column"}
                spacing={0.5}
                component={Paper}
                variant={"gradient"}
                sx={{ width: "90px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: "#6E6B7B",
                    textDecoration: "none",
                    // width: "138px",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#FF8906",
                      borderRadius: "5px",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    setDialog({ ...dialog, open: true });
                    setAnchorEl(null);
                    setStatus({ ...status, value: "approved" });
                  }}
                >
                  <MDTypography
                    sx={{
                      fontSize: "14px",
                      py: 0.5,
                      "&:hover": {
                        color: "white.main",
                      },
                    }}
                  >
                    Approve
                  </MDTypography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: "#6E6B7B",
                    textDecoration: "none",
                    // width: "138px",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#FF8906",
                      borderRadius: "5px",
                      color: "white",
                    },
                  }}
                  onClick={() => {
                    setDialog({ ...dialog, open: true });
                    setAnchorEl(null);
                    setStatus({ ...status, value: "rejected" });
                  }}
                >
                  <MDTypography
                    sx={{
                      fontSize: "14px",
                      py: 0.5,
                      "&:hover": {
                        color: "white.main",
                      },
                    }}
                  >
                    Reject
                  </MDTypography>
                </Box>
              </Stack>
            </Popover>
          </>
        );
      },
    },
  ];
  const AppointmentStatus = async (data) => {
    if (data.comment === "") {
      dispatch(openSnackbar(`Please add a comment`, "error"));
      return;
    }
    try {
      const res = await apiService.ChangeAppointmentStatus(status, data);
      console.log("response", res.data);
      if (res?.data?.success) {
        handleClose();
        getAppointments();
        dispatch(openSnackbar(`Appointment ${status.value} Successfully`, "success"));
      }
    } catch (error) {
      dispatch(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  const closePreviewModal = () => {
    setPreview({ open: false, id: "" });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack direction={"column"}>
        <Box mt={2}>
          {/* Table component */}
          {appointments?.length == 0 ? (
            <NodataFound />
          ) : (
            <Table
              rows={rows}
              columns={columns}
              CustomToolbar={() => CustomToolbar(paginationData.limitPerPage, changePageSize)}
              pageCount={paginationData.totalPages}
              pageInfo={paginationData}
              changePage={changePage}
            />
          )}
        </Box>
      </Stack>
      {dialog.open && (
        <SetMessage
          open={dialog.open}
          handleClose={handleClose}
          status={status}
          deleteFunc={AppointmentStatus}
        />
      )}
      {preview.open && (
        <AppointmentPreview open={preview.open} id={preview.id} handleClose={closePreviewModal} />
      )}
    </DashboardLayout>
  );
};

export default AllAppointments;
