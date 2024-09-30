import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DeleteIcon from "@mui/icons-material/Delete";
import Iconify from "examples/Iconify/Iconify";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiService from "components/ApiSevices/ApiServices";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import DeleteNewIcon from "../../../../assets/images/deleteIcon.png";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

const AddBanner = () => {
  const actionDispatcher = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [banners, setBanners] = useState([]);
  const [fileSize, setFileSize] = useState(null);
  const [DeletedId, setDeletedId] = useState([]);
  // To open delete modal
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      bannerId: [],
    },
  });
  const handleClose = () => {
    setDialog({
      open: false,
      title: "",
      message: "",
      buttonText: "",
    });
  };
  const handleDeleteImages = (index) => {
    setImages((prevImages) => prevImages?.filter((image, i) => i !== index));
  };
  const getBanners = async (e) => {
    try {
      const res = await apiService.getAllBanners();
      setBanners(res?.allBannerImages);
      // console.log("get all allBannerImages", res)
    } catch (error) {
      actionDispatcher(
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
    getBanners();
  }, []);
  // console.log("get all allBannerImages", banners)

  const createFormData = async () => {
    const formData = new FormData();
    console.log("images", images);
    if (images && images.length > 0) {
      images.forEach((img) => {
        console.log("file", img);
        formData.append("file", img);
      });
    }
    formData.append("title", title);

    return formData;
  };
  const addBanner = async (e) => {
    e.preventDefault();
    console.log("images", images);
    if (images.length === 0) {
      actionDispatcher(openSnackbar("Image is compulsory", "error"));
      return;
    }
    actionDispatcher(isLoading(true));

    try {
      const getFormData = await createFormData();
      const data = await apiService.createBanner(getFormData, title);
      setTitle("");
      getBanners();
      setImages([]);
      actionDispatcher(openSnackbar(data?.message, "success"));
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
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
  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    const maxFileSizeMB = 5;
    const maxImages = 1;
    if (files.length > 1) {
      actionDispatcher(openSnackbar("Only One image can be uploaded", "error"));
      return;
    }
    console.log("images.length", images.length);
    if (images.length > 0) {
      actionDispatcher(openSnackbar("Only One image can be uploaded", "error"));
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.split("/")[0];
      const sizeInMB = file.size / 1024 / 1024;
      // console.log(
      //     "file", file
      // )
      // Check file size
      if (sizeInMB > maxFileSizeMB) {
        actionDispatcher(openSnackbar("File size should be Max 5 MB", "error"));
        continue;
      }

      // Check if the file already exists in the backend data
      const match = banners?.some((newImage) => newImage.bannerImage.originalname === file.name);
      if (match) {
        actionDispatcher(openSnackbar("File already exists", "error"));
        continue;
      }

      // Check if the file type is image and not more than 5 images
      if (fileType === "image") {
        if (imagesArray.length < maxImages) {
          imagesArray.push(file);
        } else {
          actionDispatcher(openSnackbar("Only 1 images can be uploaded", "error"));
          break; // Stop further processing if max limit is reached
        }
      } else {
        actionDispatcher(openSnackbar("Videos are not allowed", "error"));
      }
    }
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };
  const handleClick = (newId) => {
    setDialog((prevState) => ({
      ...prevState,
      open: true,
      title: "",
      message: "banner",
      buttonText: "",
      data: {
        bannerId: [...prevState.data.bannerId, newId],
      },
    }));
  };
  const handleDelete = async () => {
    // console.log("banned id ", dialog.data.bannerId)
    try {
      const res = await apiService.deleteImagesBanner(dialog.data.bannerId);
      getBanners();
      actionDispatcher(openSnackbar("Banner Deleted Successfully", "success"));
    } catch (error) {
      console.log("error", error);
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Stack
        spacing={2}
        component={"form"}
        onSubmit={addBanner}
        width={"100%"}
        p={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container spacing={3} columnGap={0}>
          <Grid item xs={12} sm={12} md={2.5}>
            <MDTypography gutterBottom color="#6E6B7B" fontSize={"16px"}>
              Title
              <span style={{ color: "red" }}>*</span>
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5}>
            <TextField
              fullWidth
              placeholder="Write Title here"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
              // required
              inputProps={{
                maxLength: 100,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment style={{ fontSize: "5px" }} position="end">
                    <MDTypography fontSize="12px">{`${title.length}/100`}</MDTypography>
                  </InputAdornment>
                ),
              }}
              // helperText={`${title.length}/100`}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} columnGap={0}>
          <Grid item xs={12} md={3}>
            <MDTypography gutterBottom color="#6E6B7B" fontSize="16px">
              Add Banner Images
              <span style={{ color: "red" }}>*</span>
            </MDTypography>
          </Grid>

          <Grid
            item
            py={1.2}
            component={"label"}
            border={"2px dashed gray"}
            borderRadius={"10px"}
            htmlFor="image-upload"
            xs={12}
            md={4}
            minHeight={100}
            maxHeight={200}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            bgcolor={"primary"}
            sx={{ cursor: "pointer" }}
          >
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
            <Iconify icon="bi:images" />
            <MDTypography fontSize="15px">Upload pictures</MDTypography>
            <MDTypography fontSize="10px">Max : 5 MB / Image</MDTypography>
            {/* <MDTypography fontSize="10px">Total 5 Images Only </MDTypography> */}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          my={2}
          sx={{
            height: images.length == 0 ? 0 : 200,
            overflowY: "auto",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          {images.map((image, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Grid
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "120px",
                }}
              >
                <IconButton
                  sx={{ position: "absolute", top: 1, right: -10, cursor: "pointer" }}
                  onClick={() => handleDeleteImages(index)}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <CardMedia
                  width="100%"
                  component="img"
                  image={URL.createObjectURL(image)}
                  alt={`Selected Image ${index}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <Grid item px={26}>
            <MDButton
              variant="contained"
              color="primary"
              type="submit"
              // onClick={addBanner}
              fullWidth
              sx={{ mt: 1 }}
              disabled={title.length > 100}
            >
              Create Banner
            </MDButton>
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid item>
            <MDTypography fontSize="20px" textTransform="capitalize">
              All Uploaded Images
            </MDTypography>
          </Grid>
        </Grid>
        <Grid
          container
          columnGap={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          {banners?.map((banner, index) => {
            return (
              <Grid
                key={banner._id}
                items
                // component={Paper}
                // elevation={4}
                sx={{
                  bgcolor: "white",
                  borderRadius: "3px",
                  border: "1px solid lightgray",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 300ms ease-in-out",
                  justifyContent: "space-between",
                  "&:hover": {
                    boxShadow: "0px 2px 5px 0px",
                  },
                  cursor: "pointer",
                  mt: {
                    xs: "15px",
                  },
                  p: 1,
                  //   border: "1px solid gray",
                  borderRadius: "5px",
                  position: "relative",
                }}
                xs={12}
                lg={3.75}
                sm={5}
              >
                <Box
                  sx={{
                    // bgcolor: "gray",
                    // width: "24px",
                    // height: "24px",
                    // borderRadius: "5px",
                    position: "absolute",
                    top: 15,
                    right: 15,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setDialog({
                      open: true,
                      title: "",
                      message: "banner",
                      buttonText: "",
                      data: {
                        bannerId: [banner._id],
                      },
                    });
                  }}
                  aria-label="delete"
                >
                  {/* <img
                    src={DeleteNewIcon}
                    style={{ width: "15px", height: "15px" }}
                    alt="delete-icon"
                  /> */}
                  <IconButton
                    //   color="warning"
                    sx={{
                      borderRadius: "5px",
                      px: "5px",
                      bgcolor: "#2D2D2D80",
                      color: "white !important",
                      transition: "scale 300ms ease-all",
                      "&:hover": {
                        bgcolor: "#2D2D2D",
                        scale: "1.05",
                        // color: "white !important",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
                <Stack>
                  <img
                    src={banner?.bannerImage?.url}
                    style={{ borderRadius: "5px", width: "100%", height: "150px" }}
                  />
                </Stack>

                <Stack py={0.8} width={285}>
                  <MDTypography fontSize="15px" fontWeight="bold">
                    {banner?.title?.substring(0, 100)}{" "}
                    {`${banner?.title?.length > 100 ? "..." : ""}`}
                  </MDTypography>
                </Stack>
                {/* <Stack
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        p: 1,
                                        bgcolor: "rgb(221,218,209,0.5)",
                                    }}
                                >
                                    <Typography>₹ 20000</Typography>
                                    <Typography
                                        sx={{
                                            border: "1px solid green",
                                            borderRadius: "5px",
                                            fontSize: "15px",
                                            px: 1.5,
                                            "&:hover": {
                                                border: "1px solid black",
                                                borderRadius: "5px",
                                                color: "white",
                                                bgcolor: "dodgerblue",
                                            },
                                        }}
                                    >
                                        Explore
                                    </Typography>
                                </Stack> */}
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      {dialog.open && (
        <DeleteModal
          open={dialog.open}
          handleClose={handleClose}
          dialog={dialog}
          deleteFunc={(x) => handleDelete(x)}
        />
      )}
    </DashboardLayout>
  );
};

export default AddBanner;
