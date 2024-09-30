import {
  Avatar,
  Box,
  CardMedia,
  Collapse,
  Divider,
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
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import demo from "../../../../../assets/images/pdf.svg";
import apiService from "components/ApiSevices/ApiServices";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../../redux/action/defaultActions";
import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";

const AllStudyMaterial = () => {
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [active, setActive] = useState({
    id: "",
    status: false,
  });
  const [data, setData] = useState([]);
  const [openItemId, setOpenItemId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // To open delete modal
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      ID: null,
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClick = (userId) => {
    // setActive({ id: userId, status: true });
    // console.log("userid====>", userId)
    navigate("/SingleUserPreview", { state: { active: { id: userId, status: true } } });
  };

  // ****************************NULL ALL STATE SECTION***********************************

  const handleClose = () => {
    setAnchorEl(null);

    setDialog({
      open: false,
      title: "",
      message: "",
      buttonText: "",
    });
  };
  const handleSetId = (newId) => {
    setActive((prevState) => ({
      ...prevState,
      id: newId,
    }));
  };

  const handleClickCollapse = (id) => {
    // console.log("collapse======>", id)
    setOpenItemId(openItemId === id ? null : id);
  };

  // ****************************DELETE SELECTED DOCUMENT SECTION***********************************

  const DeletePost = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.StudyMaterialDeletePost(dialog.data.ID);
      // console.log("response", res)
      actionDispatcher(openSnackbar("File Deleted Successfully", "success"));
      actionDispatcher(isLoading(false));
      GetAllStudyMaterial();
    } catch (error) {
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
      actionDispatcher(isLoading(false));
      console.log("error", error);
    }
  };

  // ****************************GET ALL DATA SECTION***********************************

  const GetAllStudyMaterial = async () => {
    try {
      const res = await apiService.MentorShipAllStudyMaterial();
      // console.log("res allStudy mAteril====>", res)
      setData(res?.allStudyMaterials);
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
  // ****************************DOWNLOAD PDF SECTION***********************************
  //   const handleDownload = (url) => {
  //     const fileName = url.split("/").pop();
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = fileName;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   };

  const handleDownload = (url) => {
    // Extract the file name from the URL
    const fileName = url.split("/").pop();

    // Check if the URL is cross-origin
    const isCrossOrigin = new URL(url, window.location.href).origin !== window.location.origin;

    // Create a temporary link element
    const link = document.createElement("a");

    if (isCrossOrigin) {
      // Handle cross-origin URLs by using fetch and creating a Blob
      fetch(url, { mode: "cors" }) // Ensure the server supports CORS
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          link.href = blobUrl;
          link.download = fileName; // Set the download attribute for the correct file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl); // Clean up the Blob URL
        })
        .catch((err) => console.error("Failed to download file:", err));
    } else {
      // For same-origin URLs, use the link element directly
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    GetAllStudyMaterial();
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
      {data && data?.length > 0 ? (
        <MDBox
          sx={{
            borderBottom: "0.5px solid #d9d9d9",
            width: { md: "80%", xs: "100%", lg: "60%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          {data?.map((item, index) => {
            return (
              <Box
                component={Paper}
                elevation={8}
                key={index}
                my={1}
                py={2}
                px={1}
                sx={{
                  borderBottom: openItemId === item?._id ? "" : "1px solid grey",

                  borderRadius: "10px",

                  cursor: "pointer",
                }}
              >
                <ListItem
                  secondaryAction={
                    <Stack direction={"row"} py={2.5} flexDirection={"row-reverse"}>
                      {openItemId && openItemId === item?._id ? (
                        <MDBox>
                          <IconButton
                            id="all-study-material"
                            aria-controls={open ? "all-study-material-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          <Menu
                            id="all-study-material-menu"
                            aria-labelledby="all-study-material"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MenuItem onClick={() => handleOptionClick(item?.user?._id)}>
                              {" "}
                              <AccountCircleIcon fontSize="medium" /> &nbsp; View Profile
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setDialog({
                                  open: true,
                                  title: ``,
                                  message: "material",
                                  buttonText: "",
                                  data: {
                                    ID: item?._id,
                                  },
                                });
                                setAnchorEl(null);
                              }}
                            >
                              <NoAccountsIcon fontSize="medium" /> &nbsp; Remove File
                            </MenuItem>
                          </Menu>
                          {dialog?.open && (
                            <DeleteModal
                              open={dialog.open}
                              handleClose={handleClose}
                              dialog={dialog}
                              deleteFunc={() => DeletePost()}
                            />
                          )}
                        </MDBox>
                      ) : (
                        <CardMedia
                          component="img"
                          image={item?.thumbnailFile?.url}
                          alt={`Image ${index}`}
                          sx={{ width: "5rem", height: "5rem", objectFit: "cover", mb: 2 }}
                        />
                      )}
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item?.user?.profileImg?.url} alt={"Avatar"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <MDBox>
                        <MDTypography variant="h6" color="secondary">
                          {item?.topic}
                        </MDTypography>
                        <MDTypography fontSize={"0.8rem"} variant="body2">
                          Study Material :{item?.studyMaterialFiles.length} pdf{" "}
                        </MDTypography>
                      </MDBox>
                    }
                    secondary={
                      <MDTypography fontSize={"0.8rem"}>by {item?.user?.userName}</MDTypography>
                    }
                    onClick={() => handleClickCollapse(item?._id)}
                  />
                </ListItem>
                <Collapse
                  in={openItemId === item?._id}
                  timeout="auto"
                  unmountOnExit
                  my={2}
                  sx={{ marginTop: "1rem" }}
                >
                  <Box elevation={1} sx={{ borderRadius: "1rem" }}>
                    <List component="div" disablePadding>
                      {item?.studyMaterialFiles.map((item, index) => {
                        return (
                          <React.Fragment key={index}>
                            <ListItem
                              sx={{ mt: 1, p: 1, cursor: "text" }}
                              component={Paper}
                              elevation={3}
                            >
                              <ListItemIcon>
                                <Avatar
                                  sx={{ width: 40, height: 40, objectFit: "cover" }}
                                  src={demo}
                                  alt={item?.originalname}
                                />
                              </ListItemIcon>
                              <ListItemText
                                secondary={
                                  <MDTypography
                                    component="span"
                                    sx={{ fontWeight: 400, fontSize: "0.8rem" }}
                                  >
                                    {item?.originalname}
                                  </MDTypography>
                                }
                                sx={{ minWidth: "85%" }}
                              />
                              <ListItemText
                                secondary={
                                  <IconButton
                                    edge="end"
                                    color="success"
                                    aria-label="download"
                                    onClick={() => handleDownload(item?.url)}
                                  >
                                    <DownloadIcon />
                                  </IconButton>
                                }
                              />
                            </ListItem>
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </MDBox>
      ) : (
        <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MDTypography>No records found</MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
};

export default AllStudyMaterial;
