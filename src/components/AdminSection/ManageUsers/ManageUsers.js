import {
  Avatar,
  Box,
  Button,
  Checkbox,
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
  Tooltip,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import dayjs from "dayjs";
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
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import UserCustomToolbar from "./UserCustomToolbar";
import FilterComponent from "./FilterComponent";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import AllUsersTable from "./AllUsersTable";
import ConfirmationApproval from "../PartyWorker/ConfirmationApproval";
import RevokeConfirmation from "./RevokeConfirmation";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ActiveUser from "../../../assets/images/active-user.png";
import DeactiveUser from "../../../assets/images/user.png";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [autoApprove, setAutoApprove] = useState({ open: false, id: "", status: null });
  const [revokePermission, setRevokePermission] = useState({
    open: false,
    id: "",
    verification: "",
    user: "",
  });
  const [singleStatus, setSingleStatus] = useState("undefined");
  const [active, setActive] = useState({
    id: "",
    status: false,
  });
  // For pagination
  const [paginationData, setPaginationData] = useState({
    limitPerPage: 5,
    totalData: 17,
    totalPages: 4,
    currentPage: 1,
  });
  const Allusers = async (e) => {
    dispatch(isLoading(true));
    try {
      const res = await apiService.getAllUsers(paginationData, filter);
      // console.log("get all users", res?.data)

      if (res?.data.success) {
        setPaginationData(res?.data.pageInfo);
        setUsers(res?.data.allUsers);
        dispatch(isLoading(false));
      }

      // console.log("get  allUsers", res)
    } catch (error) {
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
  const changeUserPermission = async () => {
    dispatch(isLoading(true));
    try {
      const res = await apiService.changeUserPermission(revokePermission, singleStatus);
      Allusers();
      console.log("res", res);
      if (res?.data.success) {
        dispatch(openSnackbar(`User permission has updated successfully`, "success"));
        setSingleStatus("undefined");
        setRevokePermission({ open: false, id: "", verification: "", user: "" });
        dispatch(isLoading(false));
      }
      // setAutoApprove({ open: false, id: "", status: null })
      // if (res?.data.success && singleStatus === "undefined") {
      //   dispatch(openSnackbar(`User Permission ${revokePermission.verification === "approved" || revokePermission.verification === "rejected" ? "revoked" : "assigned"} successfully`, "success"));
      //   setSingleStatus("")
      //   setRevokePermission({ open: false, id: "", verification: "", user: "" })
      //   dispatch(isLoading(false));
      // }
      // if (res?.data.success && singleStatus !== "undefined") {
      //   dispatch(openSnackbar(`User Permission ${singleStatus === "approved" ? "approved" : "revoked"} successfully`, "success"));
      //   setSingleStatus("")
      //   setRevokePermission({ open: false, id: "", verification: "", user: "" })
      //   dispatch(isLoading(false));
      // }
    } catch (error) {
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
    Allusers();
  }, [paginationData.currentPage, paginationData.limitPerPage, filter]);
  // To Open View Profile and delete Popover
  const [anchorEl, setAnchorEl] = useState(null);
  // To open delete modal
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      userId: null,
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
  const id = open ? "simple-popover" : "undefined";
  //  to format the time
  const timeFormater = (date) => {
    const currentTime = dayjs(date);
    const formattedTime = currentTime.format("h:mm A");
    const formatedDate = currentTime.format("DD-MM-YYYY");

    return `${formatedDate}`;
  };
  const changePageSize = (limitPerPage) => {
    setPaginationData({ ...paginationData, currentPage: 1, limitPerPage });
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAutoApprove({ open: false, id: "", status: null });
    setDialog({
      open: false,
      title: "",
      message: "",
      buttonText: "",
    });
    setRevokePermission({ open: false, id: "", verification: "", user: "" });
    setSingleStatus("undefined");
  };
  const handleClick = (event, params) => {
    // console.log("handleClick params", params);
    if (params.row.userType === "mentor") {
      setRevokePermission({
        ...revokePermission,
        id: params.row._id,
        verification: params.row.verificationStatus,
        user: params.row.userType,
      });
    } else if (params.row.userType === "party worker") {
      setRevokePermission({
        ...revokePermission,
        id: params.row._id,
        verification: params.row.partyWorkerVerification,
        user: params.row.userType,
      });
    } else {
      setRevokePermission({ open: false, id: "", verification: "", user: "" });
    }
    setDialog({
      ...dialog,
      data: {
        userId: params.row._id,
      },
    });

    setActive({ id: params.row._id, status: params.row.isActive });
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
  const rows = processData(users);
  const columns = [
    {
      field: "index",
      headerName: <MDTypography fontSize="15px">Index</MDTypography>,
      width: 80,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
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
      field: "email",
      headerName: <MDTypography fontSize="15px">Email</MDTypography>,
      width: 185,
      // Height:"auto",
      // valueGetter: (params) => params.value,
      renderCell: (params) => {
        // console.log("user", params.value)
        return (
          <>
            <Tooltip title={`${params.value}`} arrow>
              <MDTypography
                sx={{
                  fontSize: "15px",
                  width: "170px",
                  py: 1.8,
                  overflow: "hidden", // Hides overflow content
                  whiteSpace: "nowrap", // Prevents text from wrapping
                  textOverflow: "ellipsis",
                  // textWrap: "wrap",
                  py: 1.8,
                }}
              >
                {params.value == null ? "No email" : params.value}
              </MDTypography>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "userName",
      headerName: <MDTypography fontSize="15px">Full Name</MDTypography>,
      width: 220,
      // Height:"auto",
      // valueGetter: (params) => params.value,
      renderCell: (params) => {
        // console.log("user", params)
        return (
          <>
            {params.row.userType === "party worker" ? (
              <Stack spacing={-1}>
                <MDTypography
                  sx={{
                    fontSize: "15px",
                    textWrap: "wrap",
                  }}
                >
                  {params.value == null ? "No Name" : params.value}
                </MDTypography>

                <Box display={"flex"} alignItems={"center"}>
                  <Checkbox
                    checked={params.row.autoPostApproval}
                    onChange={() => {
                      setAutoApprove({
                        open: true,
                        id: params.row._id,
                        status: params.row.autoPostApproval,
                      });
                    }}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        border: "1px solid black",
                        width: "15px",
                        height: "15px",
                      },
                    }}
                  />
                  <MDTypography fontSize="12px">Approve Posts Automatically</MDTypography>
                </Box>
              </Stack>
            ) : (
              <MDTypography
                sx={{
                  fontSize: "15px",
                  textWrap: "wrap",
                  py: 1.5,
                }}
              >
                {params.value == null ? "No Name" : params.value}
              </MDTypography>
            )}
          </>
        );
      },
    },
    {
      field: "gender",
      headerName: <MDTypography fontSize="15px">Gender</MDTypography>,
      width: 80,
      // Height:"auto",
      // valueGetter: (params) => params.value,
      renderCell: (params) => {
        // console.log("user", params.value)
        return (
          <>
            <MDTypography
              sx={{
                // ml: .5,
                fontSize: "15px",
                // width: "230px",
                textWrap: "wrap",
                py: 1.8,
                // height: 25
              }}
            >
              {params.value == null ? "N/A" : params.value}
            </MDTypography>
          </>
        );
      },
    },
    {
      field: "dateOfBirth",
      headerName: <MDTypography fontSize="15px">{`Age Category(DOB)`}</MDTypography>,
      width: 230,
      // Height:"auto",
      align: "center",
      headerAlign: "center",
      // valueGetter: (params) => params.value,
      renderCell: (params) => {
        // console.log("business private post table", params)
        return (
          <>
            <MDTypography
              sx={{
                // ml: .5,
                fontSize: "15px",
                width: "210px",
                textWrap: "wrap",
                py: 1.8,
                // height: 25
              }}
            >
              {timeFormater(params.value)}
            </MDTypography>
          </>
        );
      },
    },
    {
      field: "userType",
      headerName: <MDTypography fontSize="15px">User Type</MDTypography>,
      width: 120,
      renderCell: (params) => {
        return (
          <>
            {params.value === "mentor" ? (
              <MDTypography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  py: 1.8,
                  color:
                    params.row.verificationStatus === "approved"
                      ? "green"
                      : params.row.verificationStatus === "not verified"
                      ? "#FF7518"
                      : "red",
                }}
              >
                {params.value == null ? "No UserType" : params.value}
              </MDTypography>
            ) : params.value === "party worker" ? (
              <MDTypography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  py: 1.8,
                  color:
                    params.row.partyWorkerVerification === "approved"
                      ? "green"
                      : params.row.partyWorkerVerification === "pending"
                      ? "#FF7518"
                      : "red",
                }}
              >
                {params.value == null ? "No UserType" : params.value}
              </MDTypography>
            ) : (
              <MDTypography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  py: 1.8,
                }}
              >
                {params.value == null ? "No UserType" : params.value}
              </MDTypography>
            )}
          </>
        );
      },
    },
    {
      field: "isActive",
      headerName: <MDTypography fontSize="15px">Status</MDTypography>,
      width: 120,
      // align: "center",
      // headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <MDBox width="100%">
              <Chip
                label={params.value ? "Active" : "Deactive"}
                color={params.value ? "success" : "error"}
                size="small"
                sx={{ borderRadius: "5px", minWidth: "6rem", color: "white !important" }}
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
        return (
          <>
            <MDTypography
              sx={{
                fontSize: "20.33px",
                fontWeight: "400",
                cursor: "pointer",
                py: 1.6,
              }}
              onClick={(e) => handleClick(e, params)}
            >
              <MoreVertIcon />
            </MDTypography>
            <Popover
              id={id}
              elevation={3}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
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
                sx={{ width: "160px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    px: "5px",
                  }}
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/SingleUserPreview", { state: { active } });
                  }}
                >
                  <AccountCircleIcon />
                  <MDTypography
                    sx={{
                      fontSize: "14px",
                      "&:hover": {
                        color: "#FF8906",
                      },
                      ml: 0.5,
                    }}
                  >
                    View Profile
                  </MDTypography>
                </Box>
                <Box
                  sx={{ display: "flex", cursor: "pointer", px: "5px" }}
                  onClick={() => {
                    setDialog({
                      ...dialog,
                      open: true,
                      title: `Are you sure you want to ${
                        active.status === true ? "Deactivate" : "Activate"
                      } this user ?`,
                      message: "",
                      buttonText: active.status === true ? "Deactivate" : "Activate",
                    });
                    setAnchorEl(null);
                  }}
                >
                  {active.status === true ? (
                    <PersonOffIcon />
                  ) : (
                    <CheckIcon sx={{ color: "rgba(110, 107, 123, 1)" }} />
                  )}
                  <MDTypography
                    sx={{
                      fontSize: "14px",
                      "&:hover": {
                        color: "#FF8906",
                      },
                      ml: 0.5,
                    }}
                  >
                    {active.status === true ? "Deactivate" : "Activate"}
                  </MDTypography>
                </Box>
                {/* for assign permission */}
                {revokePermission.verification !== "" &&
                  revokePermission.verification !== "approved" &&
                  revokePermission.verification !== "rejected" && (
                    <Box
                      sx={{ display: "flex", cursor: "pointer", px: "5px" }}
                      onClick={() => {
                        setRevokePermission({ ...revokePermission, open: true });
                        setAnchorEl(null);
                        setSingleStatus("approved");
                      }}
                    >
                      <CheckIcon sx={{ color: "rgba(110, 107, 123, 1)" }} />
                      <MDTypography
                        sx={{
                          fontSize: "14px",
                          "&:hover": {
                            color: "#FF8906",
                          },
                          ml: 0.5,
                        }}
                      >
                        {(revokePermission.verification === "not verified" ||
                          revokePermission.verification === "pending") &&
                          "Assign Permission"}
                      </MDTypography>
                    </Box>
                  )}
                {/* for revoke permission */}

                {revokePermission.verification !== "" &&
                  revokePermission.verification !== "approved" &&
                  revokePermission.verification !== "rejected" && (
                    <Box
                      sx={{ display: "flex", cursor: "pointer", px: "5px" }}
                      onClick={() => {
                        setRevokePermission({ ...revokePermission, open: true });
                        setAnchorEl(null);
                        setSingleStatus("rejected");
                      }}
                    >
                      <AssignmentIndIcon />
                      <MDTypography
                        sx={{
                          fontSize: "14px",
                          "&:hover": {
                            color: "#FF8906",
                          },
                          ml: 0.5,
                        }}
                      >
                        {(revokePermission.verification === "not verified" ||
                          revokePermission.verification === "pending") &&
                          "Revoke Permission"}
                      </MDTypography>
                    </Box>
                  )}
                {/* for approved and rejected condition of revoke permission */}
                {revokePermission.verification !== "" &&
                  (revokePermission.verification === "approved" ||
                    revokePermission.verification === "rejected") && (
                    <Box
                      sx={{ display: "flex", cursor: "pointer", px: "5px" }}
                      onClick={() => {
                        setRevokePermission({ ...revokePermission, open: true });
                        setAnchorEl(null);
                      }}
                    >
                      {revokePermission.verification === "rejected" ? (
                        <AssignmentIndIcon />
                      ) : (
                        <CheckIcon sx={{ color: "rgba(110, 107, 123, 1)" }} />
                      )}
                      <MDTypography
                        sx={{
                          fontSize: "14px",
                          "&:hover": {
                            color: "#FF8906",
                          },
                          ml: 0.5,
                        }}
                      >
                        {revokePermission.verification === "rejected"
                          ? "Assign Permission"
                          : "Revoke Permission"}
                      </MDTypography>
                    </Box>
                  )}
              </Stack>
            </Popover>
          </>
        );
      },
    },
  ];
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
    // console.log("newFilter", newFilter);
  };
  const deactivateUser = async () => {
    dispatch(isLoading(true));

    try {
      const res = await apiService.DeactivateUser(dialog.data.userId);
      Allusers();
      dispatch(openSnackbar(`user updated successfully`, "success"));
      dispatch(isLoading(false));
      // if (res?.data.success) {
      //     Allusers()
      //     dispatch(openSnackbar(`user updated successfully`, "success"));
      //     dispatch(isLoading(false));
      // }
    } catch (error) {
      dispatch(isLoading(false));
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
  // console.log("revokePermission", revokePermission);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Stack direction={"column"}>
        <Box mt={2}>
          {/* Table component */}
          {users?.length == 0 ? (
            <NodataFound />
          ) : (
            <AllUsersTable
              rows={rows}
              columns={columns}
              CustomToolbar={() =>
                UserCustomToolbar(paginationData.limitPerPage, changePageSize, changeFilter)
              }
              pageCount={paginationData.totalPages}
              pageInfo={paginationData}
              changePage={changePage}
            />
          )}
        </Box>
      </Stack>
      {autoApprove.open && (
        <ConfirmationApproval
          open={autoApprove.open}
          handleClose={handleClose}
          setAutoApprove={setAutoApprove}
          autoApprove={autoApprove}
          partWorkerData={Allusers}
        />
      )}
      {dialog.open && (
        <DeleteModal
          open={dialog.open}
          handleClose={handleClose}
          dialog={dialog}
          deleteFunc={() => deactivateUser()}
        />
      )}
      {revokePermission.open && (
        <RevokeConfirmation
          handleClose={handleClose}
          singleStatus={singleStatus}
          revokePermission={revokePermission}
          changeUserPermission={changeUserPermission}
        />
      )}
    </DashboardLayout>
  );
};
