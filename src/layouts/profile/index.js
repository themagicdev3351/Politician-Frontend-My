import {
  Avatar,
  Button,
  TextField,
  IconButton,
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  Input,
  Stack,
  InputLabel,
  Paper,
} from "@mui/material";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import { PhotoCamera, Edit } from "@mui/icons-material";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import MDButton from "components/MDButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import apiService from "components/ApiSevices/ApiServices";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../redux/action/defaultActions";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import CheckIcon from "@mui/icons-material/Check";
import ChangleProfileModal from "./ChangleProfileModal";

function Overview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      postId: null,
    },
  });
  const [file, setFile] = useState(null);
  const [FileUrl, setFileUrl] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(true);
  const [focus, setFocus] = useState({ active: true, field: "" });
  const [focusMob, setFocusMob] = useState({ active: true, field: "" });
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
  });

  const [values, setValues] = useState({
    userName: "",
    phoneNo: "",
  });
  const [open, setOpen] = useState(false);
  const adminProfile = async () => {
    try {
      const res = await apiService.getAdminProfile();
      setValues(res?.adminData);
      // document.getElementById("name").value = "Hey Man"
      setFileUrl(res?.adminData?.profileImg?.url);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    adminProfile();
  }, []);
  // console.log("values", values)
  // console.log("FileUrl", FileUrl)

  const handleUpload = (e) => {
    const file = e.target.files[0];

    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      setIsFormChanged(false);
      setFileUrl(URL.createObjectURL(file));
      setFile(file);
    } else {
      dispatch(openSnackbar(`Only images are allow`, "error"));
    }
    // setIsFormChanged(false);
    // setFileUrl(URL.createObjectURL(e.target.files[0]));
    // setFile(e.target.files[0]);
  };
  const handleChange = (prop) => (event) => {
    // setIsFormChanged(false);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSave = async () => {
    dispatch(isLoading(true));

    try {
      const res = await apiService.updateAdminAccount(values, file);
      adminProfile();
      if (res.success) {
        setFile(null);
        setFormData({
          name: "",
          phoneNo: "",
        });
        setFocus({ active: true, field: "" });
        setIsFormChanged(true);

        dispatch(isLoading(false));

        dispatch(openSnackbar(`Account updated successfully`, "success"));
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        openSnackbar(
          error?.message === "Request failed with status code 500"
            ? "Network is Not working"
            : error?.response?.data?.message,
          "error"
        )
      );
    }
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const removeDp = () => {
    setFileUrl(null);
  };
  const handleClose = () => {
    // setFileUrl(null);
    setDialog({
      open: false,
      title: "",
      message: "",
      buttonText: "",
      data: {
        postId: null,
      },
    });
  };
  // console.log("values", values?.userName)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >
        <MDTypography>My Profile</MDTypography>
        {/* <MDButton
          onClick={() => navigate("/AddAccount")}
          startIcon={<AddCircleOutlineIcon />}
          color="secondary"
          variant="outlined"
        >
          Add Social Media Account
        </MDButton> */}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent={"center"} alignItems="start">
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"start"}
          width={{ xs: "100%", sm: "80%", md: "50%" }}
          // bgcolor={"red"}
        >
          <Grid
            container
            sx={{ borderRadius: "10px" }}
            spacing={2}
            mt={0.5}
            px={2}
            py={2}
            component={Paper}
          >
            <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
              {FileUrl ? (
                <>
                  <Stack position={"relative"}>
                    <Box
                      sx={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "rgb(123,128,154,0.3)",
                        // p:2
                      }}
                    >
                      <img
                        src={FileUrl}
                        alt="logo"
                        accept="image/*"
                        style={{
                          height: "90px",
                          width: "90px",
                          borderRadius: "50%",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          right: 26,
                          bottom: 6,
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setDialog({
                            open: true,
                            title: `Are you sure to change profile picture`,
                            message: "",
                            buttonText: "Change",
                            data: {
                              postId: "",
                            },
                          });
                        }}
                      >
                        {
                          <img alt="edit" style={{ height: "16px" }} src="/editIcon.svg" />
                          // <Edit
                          //   sx={{
                          //     color: "rgb(232,112,35)",
                          //   }}
                          // />
                        }
                        {/* <Box sx={{ width: 100, height: 100, borderRadius: "50%", color: "red",}}></Box> */}
                      </Box>
                    </Box>
                  </Stack>
                </>
              ) : (
                <Stack position={"relative"}>
                  <Box
                    sx={{
                      width: "125px",
                      height: "125px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "rgb(123,128,154,0.3)",
                      // p:2
                    }}
                  >
                    <Box
                      variant="h5"
                      gutterBottom
                      sx={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        background: "transparent",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "white",
                      }}
                    >
                      <Avatar
                        sx={{
                          height: "90px",
                          width: "90px",
                          borderRadius: "50%",
                          bgcolor: "rgb(123,128,154)",
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      right: 26,
                      bottom: 6,
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        sx={{ display: "none" }}
                        id="fileInput"
                        onChange={handleUpload}
                      />
                    </FormControl>
                    <InputLabel htmlFor="fileInput">
                      <PhotoCameraIcon
                        sx={{
                          color: "rgb(232,112,35)",
                          width: "20px",
                          height: "20px",
                          mt: 0.2,
                        }}
                      />
                    </InputLabel>
                  </Box>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="h6">Full Name</MDTypography>
              <Box display="flex" alignItems="center" position={"relative"}>
                <TextField
                  fullWidth
                  id="name"
                  name="userName"
                  variant="standard"
                  focus={focus.active && focus.field === "fullName"}
                  value={values && values.userName ? values.userName : ""}
                  // defaultValue={values?.name}
                  onChange={(e) => {
                    setValues({ ...values, userName: e.target.value });
                    // setIsFormChanged(false);
                  }}
                  disabled={focus.active && focus.field !== "fullName"}
                />
                {focus.active && (
                  <Box
                    position={"absolute"}
                    sx={{
                      right: 0,
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setFocus({ active: false, field: "fullName" })}
                  >
                    <MDTypography sx={{ fontSize: "14px" }}>
                      Edit{" "}
                      <span>
                        <img
                          alt="edit"
                          style={{ marginLeft: "10px", height: "16px" }}
                          src="/editIcon.svg"
                        />
                      </span>{" "}
                    </MDTypography>
                    {/* <Edit sx={{ ml: 1 }} /> */}
                  </Box>
                )}
                {!focus.active && focus.field == "fullName" && (
                  <Box
                    position={"absolute"}
                    sx={{
                      right: 0,
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFocus({ active: true, field: "fullName" });
                      handleSave();
                    }}
                  >
                    <CheckIcon sx={{ color: "green" }} />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="h6">Email</MDTypography>
              <Box display="flex" alignItems="center" position={"relative"}>
                <TextField
                  fullWidth
                  value={values.email}
                  onChange={handleChange("email")}
                  variant="standard"
                  disabled
                  id="email"
                  name="email"
                />
                {/* <Box position={'absolute'} sx={{ right: 0, bottom: 10, display: "flex", alignItems: "center", cursor: "pointer" }}>
                <MDTypography sx={{ fontSize: "16px" }}>Edit</MDTypography>
                <Edit sx={{ ml: 1 }} />
              </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="h6">Mobile Number</MDTypography>
              <Box display="flex" alignItems="center" position={"relative"}>
                <TextField
                  fullWidth
                  value={values && values.phoneNo ? values.phoneNo : ""}
                  id="phoneNo"
                  name="phoneNo"
                  // defaultValue={values?.phoneNo}
                  // onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                  onChange={(e) => {
                    setValues({ ...values, phoneNo: e.target.value });
                    // setIsFormChanged(false);
                  }}
                  variant="standard"
                  disabled={focusMob.active && focusMob.field !== "mobileNumber"}
                />
                {focusMob.active && (
                  <Box
                    position={"absolute"}
                    sx={{
                      right: 0,
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setFocusMob({ active: false, field: "mobileNumber" })}
                  >
                    <MDTypography sx={{ fontSize: "14px" }}>
                      Edit{" "}
                      <span>
                        <img
                          alt="edit"
                          style={{ marginLeft: "10px", height: "16px" }}
                          src="/editIcon.svg"
                        />
                      </span>{" "}
                    </MDTypography>
                    {/* <Edit sx={{ ml: 1 }} /> */}
                  </Box>
                )}
                {!focusMob.active && focusMob.field == "mobileNumber" && (
                  <Box
                    position={"absolute"}
                    sx={{
                      right: 0,
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFocusMob({ active: true, field: "mobileNumber" });
                      handleSave();
                    }}
                  >
                    <CheckIcon sx={{ color: "green" }} />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <MDTypography variant="h6">Password</MDTypography>
              <Box display="flex" alignItems="center" position={"relative"}>
                <TextField
                  fullWidth
                  value="*****************"
                  // onChange={handleChange('password')}
                  variant="standard"
                  id="password"
                  type="password"
                  disabled
                />
                <Box
                  position={"absolute"}
                  sx={{
                    right: 0,
                    bottom: 10,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(true)}
                >
                  <MDTypography sx={{ fontSize: "14px" }}>
                    Change Password{" "}
                    <span>
                      <img
                        alt="edit"
                        style={{ marginLeft: "10px", height: "16px" }}
                        src="/editIcon.svg"
                      />
                    </span>{" "}
                  </MDTypography>
                  {/* <MDTypography sx={{ fontSize: "16px" }}>
                    Change Password
                    <span>
                      <img alt="edit" style={{ marginLeft: "10px" }} src="/editIcon.svg" />
                    </span>{" "}
                  </MDTypography> */}
                  {/* <MDTypography sx={{ fontSize: "16px" }}>Change Password</MDTypography> */}
                  {/* <Edit sx={{ ml: 1 }} /> */}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton
                  variant="gradient"
                  color="primary"
                  onClick={handleSave}
                  disabled={isFormChanged}
                  sx={{ mt: 1 }}
                >
                  Update Profile
                </MDButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {dialog.open && (
        <ChangleProfileModal
          open={dialog.open}
          handleClose={handleClose}
          dialog={dialog}
          deleteFunc={() => removeDp()}
        />
      )}
      {open && <ChangePassword open={open} handleCloseModal={handleCloseModal} />}
    </DashboardLayout>
  );
}

export default Overview;
