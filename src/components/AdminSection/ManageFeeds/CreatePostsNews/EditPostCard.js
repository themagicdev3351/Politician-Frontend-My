import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Iconify from "examples/Iconify/Iconify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import apiService from "components/ApiSevices/ApiServices";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

const EditPostCard = () => {
  const actionDispatcher = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [tempPostData, setTempPostData] = useState({});
  const maxChars = 300;
  const maxDisc = 5000;

  //******************************* */ Add new #tag section *********************************************
  const handleChangeTitle = (e) => {
    const inputValue = e.target.value.slice(0, maxChars); // Limit input to maxChars characters
    setTitle(inputValue);
  };
  const handleChangeDescription = (e) => {
    const inputValue = e.target.value.slice(0, maxDisc); // Limit input to maxChars characters
    setDescription(inputValue);
  };

  //******************************* */ Add new #tag section *********************************************

  const handleAddOption = (title) => {
    const newOption = { title };
    setOptions((prev) => [...prev, newOption]);
  };
  //******************************* */ #tag section *********************************************

  // ******************************* GET ALL HASHTAG *********************************
  const getAllhashTagFunc = async (e) => {
    try {
      const res = await apiService.getAllhashTag();
      setOptions(res.allHashtags);
      console.log("options===>", res.allHashtags);
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
  // ***************************************************************************
  // Prevent `#` character on key press
  const handleKeyDown = (event) => {
    if (event.key === "#") {
      event.preventDefault();
    }
  };

  // ********************************************************************************************
  // edit post
  const handleEditPost = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));
    try {
      console.log("edit post handle");
      //   const getFormData = await createFormData();
      const data = await axios.put(`/api/v1/admin/update/app/post?postId=${postId}`, {
        title: title,
        description: description,
        hashtags: selectedValues?.map((hashtag) => hashtag?.hashtag),
      });

      actionDispatcher(openSnackbar(data?.data?.message, "success"));
      navigate(-1);
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error==>", error);
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

  //   get edit details
  const handleGetEditDetail = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/single/app/post/${postId}`);
      setTitle(res.data.post.title);
      setDescription(res.data.post.description);
      setTempPostData(res?.data?.post);
      setSelectedValues(transformHashtags(res?.data?.post?.hashtags));
      actionDispatcher(isLoading(false));
    } catch (error) {
      console.log("error===>", error);
      actionDispatcher(isLoading(false));
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

  //  to transform the tags into the object form
  const transformHashtags = (hashtags) => {
    return hashtags.map((hashtag) => ({ hashtag }));
  };

  //   to reset the edit state for descritpion
  const handleResetDescriptionDetail = () => {
    setDescription(tempPostData.description);
  };

  //   to reset the edit stat for title
  const handleResetTitle = () => {
    setTitle(tempPostData.title);
  };

  //   to rest the tag hashtag selection
  const handleResetHashtagSelection = () => {
    setSelectedValues(transformHashtags(tempPostData.hashtags));
  };

  useEffect(() => {
    getAllhashTagFunc();
    if (postId) {
      handleGetEditDetail();
    }
  }, []);

  // hey how are you
  const videoRegex = /^video\/(mp4|webm|ogg|avi|mkv|flv|mov)$/;
  console.log("selectedValyes===>", selectedValues);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <Stack pl={4} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography textAlign={"start"} variant="h6" color={"primary"}>
              Edit Post
            </Typography>
            <Button
              variant="contained"
              size="small"
              sx={{
                color: "white !important",
                bgcolor: "#FF7518 !important",
                outlineColor: "#FF7518 !important",
                borderColor: "#FF7518",
                // fontSize: "15px",
              }}
              startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Stack>
          <Divider />
          <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Card
              sx={{ maxWidth: 700, padding: "2rem" }}
              component={"form"}
              onSubmit={handleEditPost}
            >
              {tempPostData?.postMediaFiles && tempPostData?.postMediaFiles.length > 0 ? (
                <>
                  <Stack>
                    <Typography variant="h6" component={"div"}>
                      Added Media Files
                    </Typography>
                    <Typography
                      variant="body2"
                      color={"warning"}
                      sx={{ color: "primary.main" }}
                      component={"p"}
                      fontSize={"12px"}
                    >
                      The media files are not editable except this rest fields can be modified **
                    </Typography>
                  </Stack>

                  <Grid
                    container
                    spacing={2}
                    // my={2}
                    rowGap={2}
                    sx={{
                      height: 200,
                      overflowY: "auto",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    {tempPostData?.postMediaFiles?.map((file, index) => {
                      if (videoRegex?.test(file?.contentType)) {
                        return (
                          <Grid item xs={12} sm={4} key={index}>
                            <Grid sx={{ position: "relative", width: "100%", height: "120px" }}>
                              <CardMedia
                                component="video"
                                controls
                                src={file?.url}
                                alt={file?.filename}
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </Grid>
                          </Grid>
                        );
                      } else {
                        return (
                          <Grid item xs={12} sm={4} md={3} key={index}>
                            <Grid
                              sx={{
                                position: "relative",
                                width: "100%",
                                height: "120px",
                              }}
                            >
                              <CardMedia
                                width="100%"
                                component="img"
                                image={file?.url}
                                alt={file?.filename}
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            </Grid>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </>
              ) : (
                <></>
              )}

              <Grid container rowGap={2} mt={1} mb={2}>
                <Grid item xs={12} sm={12} md={2.5}>
                  <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                    Title
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9.5}>
                  <TextField
                    onChange={handleChangeTitle}
                    fullWidth
                    multiline
                    required
                    minRows={2}
                    value={title}
                    inputProps={{
                      maxLength: maxChars, // Set max length attribute
                    }}
                  />
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton
                      sx={{ fontSize: "16px" }}
                      color="warning"
                      onClick={handleResetTitle}
                    >
                      <Icon icon={"mage:refresh-reverse"} />
                      reset &nbsp;
                    </IconButton>
                    <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
                      {title?.length}/{maxChars}
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container rowGap={2} mt={2} mb={2}>
                <Grid item xs={12} sm={12} md={2.5}>
                  <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                    Description
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9.5}>
                  <TextField
                    onChange={handleChangeDescription}
                    fullWidth
                    multiline
                    minRows={5}
                    required
                    value={description}
                    inputProps={{
                      maxLength: maxDisc, // Set max length attribute
                    }}
                  />
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton
                      sx={{ fontSize: "16px" }}
                      color="warning"
                      onClick={handleResetDescriptionDetail}
                    >
                      <Icon icon={"mage:refresh-reverse"} />
                      reset &nbsp;
                    </IconButton>
                    <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
                      {description.length}/{maxDisc}
                    </MDTypography>
                  </Stack>
                </Grid>
              </Grid>

              <Grid container mt={2} mb={2}>
                <Grid item xs={12} sm={12} md={2.5}>
                  <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                    Add Hashtags
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9.5}>
                  <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                    <Autocomplete
                      sx={{ width: "40rem" }}
                      multiple
                      id="size-small-outlined-multi"
                      size="medium"
                      value={selectedValues}
                      //   isOptionEqualToValue={selectedValues}
                      options={options.length > 0 ? options : []}
                      getOptionLabel={(option) => `#${option?.hashtag}`}
                      defaultValue={options[0] ? [options[0]] : []}
                      filterOptions={(options, state) => {
                        const filtered = (options || [])?.filter((option) =>
                          option?.hashtag?.includes(state?.inputValue)
                        );
                        if (
                          state.inputValue !== "" &&
                          !filtered?.some((option) => option.hashtag === state.inputValue)
                        ) {
                          filtered?.push({
                            hashtag: `${state.inputValue}`,
                            isNew: true,
                          });
                        }
                        return filtered;
                      }}
                      renderOption={(props, option) => (
                        <ListItem {...props}>
                          {option.isNew ? (
                            <ListItemIcon>
                              <IconButton
                                onClick={() => handleAddOption(option.hashtag.slice(5, -1))}
                              >
                                <AddIcon
                                  sx={{
                                    backgroundColor: "#DBDADE !important",
                                    color: "black !important",
                                  }}
                                />
                              </IconButton>
                            </ListItemIcon>
                          ) : null}
                          {/* <ListItemText primary={`#${option.hashtag}`} /> */}
                          <Typography variant="body2" component={"span"}>
                            <span style={{ fontWeight: "bold" }}># </span>
                            {`${option.hashtag}`}
                          </Typography>
                        </ListItem>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Add #Tag"
                          placeholder="Favorites"
                          onKeyDown={handleKeyDown}
                          startAdornment={<InputAdornment position="end">#</InputAdornment>}
                        />
                      )}
                      ChipProps={{
                        sx: {
                          backgroundColor: "#DBDADE !important", // Change the color here
                          color: "black !important",
                        },
                      }}
                      onChange={(event, newValue) => {
                        setSelectedValues(newValue);
                      }}
                    />
                    <IconButton
                      sx={{ fontSize: "16px" }}
                      color="warning"
                      onClick={handleResetHashtagSelection}
                    >
                      {/* <iconify-icon icon="mage:refresh-reverse"></iconify-icon> */}
                      <Icon icon={"mage:refresh-reverse"} />
                      reset &nbsp;
                    </IconButton>
                  </Stack>
                </Grid>
              </Grid>

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                width={"100%"}
                mt={4}
              >
                <MDButton
                  variant="gradient"
                  type="submit"
                  color="primary"
                  sx={{ width: "40% !important" }}
                >
                  Update Post
                </MDButton>
              </Box>
            </Card>
          </Box>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default EditPostCard;
