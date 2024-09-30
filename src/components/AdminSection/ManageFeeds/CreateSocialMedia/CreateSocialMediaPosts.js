import {
  Autocomplete,
  Box,
  Card,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
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
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

const CreateSocialMediaPosts = () => {
  // const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const urlRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^&=\n%\?]{11})/;
  const [error, setError] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [socialMediaAccounts, setSocialMediaAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postUrl: "",
    hashtags: [],
  });

  const getSocialMediaAccount = async (e) => {
    try {
      const res = await apiService.getAllSocialMediaAccount();
      // setOptions(res.allHashtags)
      setSocialMediaAccounts(res);
      console.log("get all social media acounts", res);
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
  // console.log("get all social media acounts", socialMediaAccounts)

  const getAllhashTagFunc = async (e) => {
    try {
      const res = await apiService.getAllhashTag();
      console.log("res", res);
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
  useEffect(() => {
    getAllhashTagFunc();
    getSocialMediaAccount();
  }, []);
  const handleAddOption = (title) => {
    const newOption = { title };
    console.log("newOption", newOption);
    setOptions((prev) => [...prev, newOption]);
  };
  const submitHandler = async (e) => {
    // actionDispatcher(isLoading(true));
    e.preventDefault();
    try {
      const response = await apiService.createSocialMediaPost(formData, accountId);
      console.log("create response", response.data);
      actionDispatcher(openSnackbar("Created SuccessFully", "success"));
      if (response.data.success) {
        navigate("/ManagePost?tab=ManageYoutubePost");
      }
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
  const selectAccount = (event) => {
    setAccountId(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "#") {
      event.preventDefault();
    }
  };

  const handleChangeUrl = (event) => {
    const newValue = event.target.value;
    // Example regex: Only allows letters and numbers
    // const regex = /^[a-zA-Z0-9]*$/;

    if (urlRegex.test(newValue)) {
      setError(false);
      setFormData({
        ...formData,
        postUrl: event.target.value,
      });
    } else {
      setError(true);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box width={"100%"} py={5} display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Card sx={{ maxWidth: 700, padding: "2rem" }} component={"form"} onSubmit={submitHandler}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={12} md={2.5}>
              <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                Select Account
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9.5}>
              <FormControl fullWidth>
               
                <Select
                  labelId="account-select-label"
                  id="account-select"
                  value={accountId === "" ? "select-account" : accountId}
                  onChange={selectAccount}
                  
                  sx={{ height: 45 }}
                >
                  <MenuItem value={"select-account"}>--select-account--</MenuItem>
                  {socialMediaAccounts.allAccounts?.map((account, id) => (
                    <MenuItem key={account._id} value={account._id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>{account?.platform}</Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={12} md={2.5}>
              <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                Add URL
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9.5}>
              <TextField
                type="text"
                name="postUrl"
                required
                error={!!error}
                helperText={
                  error ? "URL pattern should be like this https://demo.something.co" : ""
                }
                // onChange={(e) =>
                //   setFormData({
                //     ...formData,
                //     postUrl: e.target.value,
                //   })
                // }
                onChange={(e) => {
                  handleChangeUrl(e);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} my={2}>
            <Grid item xs={12} sm={12} md={2.5}>
              <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                Title
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9.5}>
              <MDInput
                type="text"
                name="title"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                fullWidth
              ></MDInput>
            </Grid>
          </Grid>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={12} md={2.5}>
              <Typography gutterBottom color="#6E6B7B" fontSize={"16px"}>
                Description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={9.5}>
              <MDInput
                type="text"
                multiline
                name="description"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                fullWidth
              ></MDInput>
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
                  required
                  options={options.length > 0 ? options : []}
                  getOptionLabel={(option) => `#${option?.hashtag}`}
                  defaultValue={options[0] ? [options[0]] : []}
                  filterOptions={(options, state) => {
                    // console.log("options", options)
                    // console.log("state", state)
                    const filtered = (options || []).filter((option) =>
                      option?.hashtag?.includes(state?.inputValue)
                    );
                    console.log("filtered", filtered);
                    if (
                      state.inputValue !== "" &&
                      !filtered.some((option) => option.hashtag === state.inputValue)
                    ) {
                      filtered.push({
                        hashtag: state.inputValue,
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
                      {/* <ListItemText primary={option.hashtag} /> */}
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
                    />
                  )}
                  ChipProps={{
                    sx: {
                      backgroundColor: "#DBDADE !important", // Change the color here
                      color: "black !important",
                    },
                  }}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      hashtags: newValue.map((hashtagObj) => hashtagObj.hashtag),
                    });
                  }}
                />
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
              type="submit"
              variant="gradient"
              color="primary"
              sx={{ width: "40% !important" }}
            >
              Create Post
            </MDButton>
          </Box>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default CreateSocialMediaPosts;
