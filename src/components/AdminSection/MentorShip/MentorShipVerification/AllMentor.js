import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import MDBox from "components/MDBox";
import * as React from "react";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import demo from "../../../../assets/images/favicon1.png";
import MDButton from "components/MDButton";
import apiService from "components/ApiSevices/ApiServices";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import ErrorIcon from "@mui/icons-material/Error";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { useNavigate } from "react-router-dom";

const AllMentor = () => {
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [active, setActive] = useState({
    id: "",
    status: false,
  });
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOptionClick = (userId) => {
    // setActive({ id: userId, status: true });
    // console.log("userid====>", userId)
    navigate("/SingleUserPreview", { state: { active: { id: userId, status: true } } });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const GetVerifyMentor = async () => {
    try {
      const res = await apiService.AllVerifyMentor();
      console.log("res VerifyMentorrrr====>", res)
      setData(res?.otherVerificationRequests);
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

  // --------------------------------------
  const handleVerifyMentor = async (status, verificationId) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.VerifyMentor(status, verificationId);
      // console.log("res VerifyMentorrrr====>")
      actionDispatcher(openSnackbar(res?.message, "success"));
      actionDispatcher(isLoading(false));
      GetVerifyMentor();
      // setData(res?.verificationRequests)
    } catch (error) {
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      actionDispatcher(isLoading(false));
      console.log("error", error);
    }
  };

  useEffect(() => {
    GetVerifyMentor();
  }, []);

  return (
    <MDBox
      sx={{
        marginRight: "1rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBox
        sx={{ width: "60%", display: "flex", flexDirection: "column", justifyContent: "center" }}
      >
        {data?.mentor?.status === "pending" ||
          data?.map((item, index) => {
            // console.log("items", item)
            return (
              <MDBox key={index} sx={{ borderBottom: "0.5px solid #d9d9d9" }} my={1} py={2}>
                <ListItem
                  sx={{ cursor: "pointer", p: 2, borderRadius: "10px" }}
                  onClick={() => handleOptionClick(item?.mentor?._id)}
                  elevation={4}
                  component={Paper}
                  secondaryAction={
                    <Stack mr={2} direction={"row"} gap={2}>
                      <MDTypography
                        sx={{
                          color: item?.status === "approved" ? "#138808" : "#FF9933",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                        variant={"contained"}
                        size={"small"}
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleVerifyMentor("approved", item?._id);
                      // }}
                      >
                        {item?.status === "approved" ? "Verified" : "Rejected"}
                      </MDTypography>
                      <MDTypography>
                        {item?.status === "approved" ? (
                          <VerifiedIcon color={"success"} />
                        ) : (
                          <ErrorIcon color={"warning"} />
                        )}{" "}
                      </MDTypography>
                      {/* <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls={open ? 'long-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton> */}
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item?.mentor?.profileImg?.url} alt={"Avatar"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <MDBox>
                        <MDTypography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: "medium",
                            textTransform: "capitalize",
                          }}
                          variant="body1"
                          color="secondary"
                        >
                          {" "}
                          {item?.mentor === null ? "No Name" : item?.mentor?.userName}
                        </MDTypography>
                        <MDTypography sx={{ fontSize: "0.8rem" }} variant="body2">
                          {item?.highestQualification}
                        </MDTypography>
                      </MDBox>
                    }
                    secondary={item?.chat ? "Chat Enable" : "Chat Disable"}
                  />
                </ListItem>

                <MDBox>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem key="View Profile" onClick={handleClose}>
                      <AccountCircleIcon sx={{ fontSize: "1.5rem !important" }} /> &nbsp; View
                      Profile
                    </MenuItem>
                    <MenuItem key="Deactivate User" onClick={handleClose}>
                      <PersonOffIcon sx={{ fontSize: "1.5rem !important" }} /> &nbsp; Deactivate
                      User
                    </MenuItem>
                  </Menu>
                </MDBox>
              </MDBox>
            );
          })}
      </MDBox>
    </MDBox>
  );
};

export default AllMentor;
