import {
  Autocomplete,
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MDInput from "../../../MDInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import apiService from "../../../ApiSevices/ApiServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import Iconify from "examples/Iconify/Iconify";
import MDTypography from "components/MDTypography";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

const PostCard = () => {
  const actionDispatcher = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const maxChars = 300;
  const maxDisc = 5000;

  const handleChangeTitle = (e) => {
    const inputValue = e.target.value.slice(0, maxChars); // Limit input to maxChars characters
    setTitle(inputValue);
  };
  const handleChangeDescription = (e) => {
    const inputValue = e.target.value.slice(0, maxDisc); // Limit input to maxChars characters
    setDescription(inputValue);
  };

  const handleDeleteImages = (index) => {
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  const handleDeleteVideo = (index) => {
    setVideos((prevImages) => prevImages.filter((video, i) => i !== index));
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

  // ************************** Stored All data inside the formData******************************
  const createFormData = async () => {
    const formData = new FormData();
    if (images && images.length > 0) {
      images.forEach((img) => {
        formData.append("files", img);
      });
    }
    if (videos && videos.length > 0) {
      videos.forEach((video) => {
        formData.append("files", video);
      });
    }
    if (description !== "") {
      formData.append("description", description);
    }
    if (title !== "") {
      formData.append("title", title);
    }

    if (selectedValues && selectedValues.length > 0) {
      selectedValues.forEach((val) => {
        formData.append("hashtags", val?.hashtag);
      });
    }
    return formData;
  };
  // ********************************************************************************************
  // ***********************  Api SignIn Section  ***********************************
  const postCreation = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));
    try {
      const getFormData = await createFormData();
      const data = await apiService.createPost(getFormData);
      actionDispatcher(openSnackbar(data?.message, "success"));
      navigate("/ManagePost?tab=AdminPost");
      actionDispatcher(isLoading(false));
      // }
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
  // *********************************************************\
  const handleFileChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    const videosArray = [];
    const maxFileSizeMB = 200;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type.split("/")[0]; // 'image' or 'video'
      const sizeInMB = file.size / 1024 / 1024;
      if (fileType === "image") {
        imagesArray.push(file);
      } else if (fileType === "video") {
        if (sizeInMB > maxFileSizeMB) {
          actionDispatcher(openSnackbar("File size should be Max 200 MB", "error"));
          continue;
        }
        videosArray.push(file);
      }
    }
    setVideos((prevVideos) => [...prevVideos, ...videosArray]);
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };
  useEffect(() => {
    getAllhashTagFunc();
  }, []);
  // Prevent `#` character on key press
  const handleKeyDown = (event) => {
    if (event.key === "#") {
      event.preventDefault();
    }
  };
  return (
    <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Card sx={{ maxWidth: 700, padding: "2rem" }} component={"form"} onSubmit={postCreation}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={3.5}>
            <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
              Add images/videos
            </Typography>
          </Grid>

          <Grid
            item
            p={0}
            component={"label"}
            border={"2px dashed gray"}
            borderRadius={"10px"}
            htmlFor="image-upload"
            // bgcolor={"red"}
            xs={12}
            md={6}
            lg={5.25}
            // color={"gray"}
            minHeight={100}
            maxHeight={200}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            bgcolor={"primary"}
            // onClick={handleGridClick}
            sx={{ cursor: "pointer" }}
          >
            <input
              accept="image/*, video/*"
              id="image-upload"
              type="file"
              hidden
              multiple // Allow selecting multiple files
              onChange={handleFileChange}
              //   ref={fileInputRef}
            />
            <Iconify icon="bi:images" />
            <MDTypography fontSize="15px">Upload pictures/videos</MDTypography>
            <MDTypography fontSize="10px">Max : 200 MB</MDTypography>
          </Grid>

          {/* <Grid item xs={6} sm={6} md={6} >
                            <TextField
                                type="file"
                                inputProps={{ accept: "video/*", multiple: true }}
                                onChange={handleVideoChange}
                                fullWidth
                            />
                        </Grid> */}
          {/* </Grid> */}
        </Grid>
        <Grid
          container
          spacing={2}
          my={2}
          sx={{
            height: images.length == 0 && videos.length == 0 ? 0 : 200,
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
                  sx={{ position: "absolute", top: 1, left: 125, cursor: "pointer" }}
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
          {videos.map((video, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Grid sx={{ position: "relative", width: "100%", height: "120px" }}>
                <IconButton
                  sx={{ position: "absolute", top: 0.5, left: 125, cursor: "pointer", zIndex: 200 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVideo(index);
                  }}
                  aria-label="delete"
                >
                  <DeleteIcon color="error" />
                </IconButton>
                <CardMedia
                  component="video"
                  controls
                  src={URL.createObjectURL(video)}
                  alt={`Selected Video ${index}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} my={2}>
          <Grid item xs={12} sm={12} md={2.5}>
            <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
              Title
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={9.5}>
            {/* <MDInput type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth>

                        </MDInput> */}
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
            <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
              {title.length}/300
            </MDTypography>
          </Grid>
        </Grid>

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
              minRows={5}
              required
              value={description}
              inputProps={{
                maxLength: maxDisc, // Set max length attribute
              }}
            />
            <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
              {description.length}/{maxDisc}
            </MDTypography>
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
                options={options.length > 0 ? options : []}
                getOptionLabel={(option) => `#${option?.hashtag}`}
                defaultValue={options[0] ? [options[0]] : []}
                filterOptions={(options, state) => {
                  const filtered = (options || []).filter((option) =>
                    option?.hashtag?.includes(state?.inputValue)
                  );
                  if (
                    state.inputValue !== "" &&
                    !filtered.some((option) => option.hashtag === state.inputValue)
                  ) {
                    filtered.push({
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
                        <IconButton onClick={() => handleAddOption(option.hashtag.slice(5, -1))}>
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
            </Stack>
          </Grid>
        </Grid>

        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"} mt={4}>
          <MDButton
            variant="gradient"
            type="submit"
            color="primary"
            sx={{ width: "40% !important" }}
          >
            Create Post
          </MDButton>
        </Box>
      </Card>
    </Box>
  );
};

export default PostCard;
