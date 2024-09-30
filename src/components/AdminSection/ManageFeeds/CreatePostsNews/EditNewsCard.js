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
import MDInput from "components/MDInput";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

const EditNewsCard = () => {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const actionDispatcher = useDispatch();
  const [editTempNewsData, setEditTempNewsData] = useState({});
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [loaction, setLocation] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedOption, setSelectedOption] = useState("newsUrl");
  const maxChars = 300;
  const maxDisc = 5000;
  const [error, setError] = useState("");
  // const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  // const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})([/\w .-]*)*\/?$/
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})(\/[^\s]*)?$/;

  const videoRegex = /^video\/(mp4|webm|ogg|avi|mkv|flv|mov)$/;
  const handleChangeTitle = (e) => {
    const inputValue = e.target.value.slice(0, maxChars); // Limit input to maxChars characters
    setTitle(inputValue);
  };
  const handleChangeDescription = (e) => {
    const inputValue = e.target.value.slice(0, maxDisc); // Limit input to maxChars characters
    setDescription(inputValue);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleChangeUrl = (event) => {
    const newValue = event.target.value;
    // Example regex: Only allows letters and numbers
    // const regex = /^[a-zA-Z0-9]*$/;
    if (urlRegex.test(newValue)) {
      setPostUrl(event.target.value);
      setError(false);
    } else {
      setPostUrl(event.target.value);
      setError(true);
    }
  };

  // get edited data
  const geteditTempNewsData = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.get(`/api/v1/admin/get/single/news/feed/${newsId}`);
      setTitle(res?.data?.newsFeed?.title);
      setLocation(res?.data?.newsFeed?.location);
      if (res?.data?.newsFeed?.description) {
        setDescription(res?.data?.newsFeed?.description);
      }
      if (res?.data?.newsFeed?.newsUrl) {
        setPostUrl(res?.data?.newsFeed?.newsUrl);
      }
      setSelectedValues(transformHashtags(res?.data?.newsFeed?.hashtags));
      setEditTempNewsData(res?.data?.newsFeed);
      actionDispatcher(isLoading(false));

      console.log("res===>", res);
    } catch (error) {
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
    setDescription(editTempNewsData?.description);
  };

  //   to reset the edit stat for title
  const handleResetTitle = () => {
    setTitle(editTempNewsData?.title);
  };

  //   to reset the location
  const handleResetLocation = () => {
    setLocation(editTempNewsData?.location);
  };

  //   to reset postUrl
  const handleResetPostUrl = () => {
    setPostUrl(editTempNewsData?.newsUrl);
  };

  //   to rest the tag hashtag selection
  const handleResetHashtagSelection = () => {
    setSelectedValues(transformHashtags(editTempNewsData.hashtags));
  };

  // ******************************* GET ALL HASHTAG *********************************
  const getAllhashTagFunc = async (e) => {
    try {
      const res = await apiService.getAllhashTag();
      setOptions(res.allHashtags);
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
  // ***************************************************************************

  // edit post
  const handleUpdateNewsPost = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));
    try {
      //   const getFormData = await createFormData();
      const newsData = {
        title: title,
        description: description && editTempNewsData.description ? description : undefined,
        hashtags: selectedValues?.map((hashtag) => hashtag?.hashtag),
        newsUrl: postUrl && editTempNewsData.newsUrl ? postUrl : undefined,
      };
      if (editTempNewsData.newsUrl) {
        delete newsData.description;
      }
      if (editTempNewsData.description) {
        delete newsData.newsUrl;
      }
      const data = await axios.put(`/api/v1/admin/update/news/feed?newsFeedId=${newsId}`, newsData);

      actionDispatcher(openSnackbar(data?.data?.message, "success"));
      navigate(-1);
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error==>", error);
    }
  };

  useEffect(() => {
    if (newsId) {
      geteditTempNewsData();
    }
    getAllhashTagFunc();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "#") {
      event.preventDefault();
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <Stack pl={4} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography textAlign={"start"} variant="h6" color={"primary"}>
              Edit News
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
              onSubmit={handleUpdateNewsPost}
            >
              {editTempNewsData?.newsMediaFiles && editTempNewsData?.newsMediaFiles.length > 0 ? (
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
                    {editTempNewsData?.newsMediaFiles?.map((file, index) => {
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

              <Grid container spacing={2} mb={2}>
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

              {/* Conditional rendering based on selected radio button */}
              {editTempNewsData?.newsUrl && (
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={12} sm={12} md={2.5}>
                    <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                      News Url
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9.5}>
                    <MDInput
                      type="text"
                      required
                      value={postUrl}
                      onChange={handleChangeUrl}
                      fullWidth
                      error={!!error}
                      // helperText={
                      //   error ? "URL pattern should be like this https://demo.something.co" : ""
                      // }
                    />
                    {/* <span style={{ fontSize: "10px", color: "red" }}>{error}</span> */}
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <IconButton
                        sx={{ fontSize: "16px" }}
                        color="warning"
                        onClick={handleResetPostUrl}
                      >
                        <Icon icon={"mage:refresh-reverse"} />
                        reset &nbsp;
                      </IconButton>
                      <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
                        <span style={{ fontSize: "10px", color: error ? "red" : "" }}>
                          {"URL pattern should be like this https://demo.something.co"}
                        </span>
                      </MDTypography>
                    </Stack>
                  </Grid>
                </Grid>
              )}

              {editTempNewsData?.description && (
                <Grid container spacing={2} mb={2}>
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
                      required
                      value={description}
                      minRows={5}
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
              )}

              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={12} md={2.5}>
                  <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                    Location
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={9.5}>
                  <MDInput
                    type="text"
                    multiline
                    required
                    value={loaction}
                    onChange={(e) => setLocation(e.target.value)}
                    fullWidth
                  />
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <IconButton
                      sx={{ fontSize: "16px" }}
                      color="warning"
                      onClick={handleResetLocation}
                    >
                      <Icon icon={"mage:refresh-reverse"} />
                      reset &nbsp;
                    </IconButton>
                    {/* <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
                      {title?.length}/{maxChars}
                    </MDTypography> */}
                  </Stack>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
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
                  // onClick={postCreation}
                >
                  Update News
                </MDButton>
              </Box>
            </Card>
          </Box>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default EditNewsCard;
