import { Card, CardMedia, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import MDInput from "../../../../MDInput";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useState } from "react";
import apiService from "../../../../ApiSevices/ApiServices";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../../redux/action/defaultActions";
import MDButton from "components/MDButton";
import Iconify from "examples/Iconify/Iconify";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";

const UploadStudyMaterial = () => {
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [state, setState] = useState({
    files: [],
    pdfFiles: [],
  });
  const [title, setTitle] = useState("");
  const maxChars = 100;

  // Handle title change
  const handleChangeTitle = (e) => {
    const inputValue = e.target.value.slice(0, maxChars); // Limit input to maxChars characters
    setTitle(inputValue);
  };

  // Handle file change
  const handleStoreFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setState((prevState) => ({
      ...prevState,
      files: [...prevState.files, ...newFiles],
    }));
  };

  //******************************* */ Add Document/Delete Document section *********************************************

  // Handle delete image
  const handleDeleteImages = (index) => {
    setState((prevState) => ({
      ...prevState,
      files: prevState.files.filter((file, i) => i !== index),
    }));
  };

  // Handle PDF file change
  const handlePdfFileChange = (event) => {
    const newPdfFiles = Array.from(event.target.files);
    setState((prevState) => ({
      ...prevState,
      pdfFiles: [...prevState.pdfFiles, ...newPdfFiles],
    }));
  };

  // delete pdf section images
  const handleDeleteDoc = (index) => {
    setState((prevState) => ({
      ...prevState,
      pdfFiles: prevState.pdfFiles.filter((file, i) => i !== index),
    }));
  };

  // ************************** Stored All data inside the formData******************************
  const CreateFormData = async () => {
    const formData = new FormData();
    formData.append("topic", title);
    // formData.append("specaialization",selectedSpecialization);
    if (state.files.length === 0) {
      actionDispatcher(openSnackbar("thumbnail is required", "error"));
    }

    state.files.forEach((file, index) => {
      formData.append(`thumbnailFile`, file);
    });
    state.pdfFiles.forEach((file, index) => {
      formData.append(`studyMaterialFiles`, file);
    });

    return formData;
  };
  // ********************************************************************************************

  // ***********************  Api SignIn Section  ***********************************
  const postCreation = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));
    try {
      const getFormData = await CreateFormData();
      const data = await apiService.UploadStudyMaterial(getFormData);
      console.log("uploaded data", data?.data.success);
      if (data?.data.success) {
        navigate("?tab=YourUploaded");
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Uploaded successfully", "success"));
        setState({
          files: [],
          pdfFiles: [],
        });
        setTitle("");
      }
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
      actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
    }
  };
  // *********************************************************\

  return (
    <MDBox width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Card sx={{ padding: "2rem", width: "100%" }} onSubmit={postCreation} component={"form"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={4.5}>
            <MDTypography gutterBottom color="#242424 !important" fontSize={"1rem"}>
              Thumbnail
            </MDTypography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            p={0}
            component={"label"}
            border={"2px dashed gray"}
            borderRadius={"10px"}
            htmlFor="image-upload"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            bgcolor={"primary"}
            // onClick={handleGridClick}
            sx={{ cursor: "pointer" }}
          >
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              hidden
              required
              // multiple // Allow selecting multiple files
              onChange={handleStoreFileChange}
              //   ref={fileInputRef}
            />
            <Iconify icon="bi:images" />
            <MDTypography color={"#242424"}>Upload Thumbnail</MDTypography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={5}
            md={4}
            spacing={2}
            sx={{
              height: state?.files.length == 0 ? 0 : 200,
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            {state?.files.map((image, index) => (
              <Grid key={index}>
                <Grid
                  sx={{
                    position: "relative",
                    width: "70%",
                    height: "120px",
                  }}
                >
                  <IconButton
                    sx={{ position: "absolute", top: 1, left: 165, cursor: "pointer" }}
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
        </Grid>

        {/* <Grid container spacing={2} my={2}>
          <Grid item xs={12} sm={12} md={4.2}>
            <MDTypography gutterBottom color="#242424" fontSize={"1rem"}>
              Select Material Specialization
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7.8}>
            <TextField
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              fullWidth
              type="text"
              variant="outlined"
              value={selectedSpecialization}
              placeholder="please select specialization"
              id="coureseAvailable"
              required
              select
              sx={{
                "& .MuiInputBase-root": {
                  height: "3rem", // Adjust input height as needed
                },
                "& .MuiSelect-select": {
                  height: "100%", // Adjust input text container height to fill
                },
              }}
            >
              <MenuItem value="--" disabled>
                --select--
              </MenuItem>
              <MenuItem value="upsc">UPSC</MenuItem>
            </TextField>
          </Grid>
        </Grid> */}

        <Grid container spacing={2} my={2}>
          <Grid item xs={12} sm={12} md={4.2}>
            <MDTypography gutterBottom color="#242424" fontSize={"1rem"}>
              Topic/Name of the Content Material
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={7.8}>
            {/* <MDInput type="text"
                            fullWidth
                            onChange={handleTitleChange}
                        >
                        </MDInput> */}
            <TextField
              onChange={handleChangeTitle}
              fullWidth
              multiline
              required
              value={title}
              inputProps={{
                maxLength: maxChars, // Set max length attribute
              }}
            />
            <MDTypography sx={{ textAlign: "end" }} variant={"h6"}>
              {title.length}/100
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3} my={2}>
          <Grid item xs={12} sm={12} md={4.5}>
            <MDTypography gutterBottom color="#242424" fontSize={"1rem"}>
              Upload Study Material
            </MDTypography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            component={"label"}
            border={"2px dashed gray"}
            borderRadius={"10px"}
            htmlFor="file-upload"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            bgcolor={"primary"}
            // onClick={handleGridClick}
            sx={{ cursor: "pointer" }}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              id="file-upload"
              // hidden
              multiple
              style={{ display: "none" }}
              onChange={handlePdfFileChange}
            />
            <PictureAsPdfIcon sx={{ width: "28px", height: "28px" }} />
            {/* <Iconify icon="bi:images" /> */}
            <MDTypography>Add in format of pdf or docs</MDTypography>
          </Grid>
          <Grid item xs={12} sm={8} md={12}>
            <Grid item xs={19} sm={9} md={10}>
              <MDTypography variant="h6">Selected File:</MDTypography>
            </Grid>
            {state?.pdfFiles && state?.pdfFiles.length > 0 ? (
              <Stack direction={"row"} gap={2}>
                {state?.pdfFiles.map((file, index) => {
                  return (
                    <MDBox key={index} sx={{ marginTop: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={3} sm={3} md={2}>
                          <IconButton
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleDeleteDoc(index)}
                            aria-label="delete"
                          >
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <MDTypography variant="h6" fontWeight={"regular"}>
                        Name: {file.name}
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight={"regular"}>
                        Type: {file.type}
                      </MDTypography>
                      <MDTypography variant="h6" fontWeight={"regular"}>
                        Size: {(file.size / 1024).toFixed(2)} KB
                      </MDTypography>
                    </MDBox>
                  );
                })}
              </Stack>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <MDBox
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          mt={4}
        >
          <MDButton
            variant="gradient"
            color="primary"
            type="submit"
            disabled={state.files.length === 0}
            sx={{ width: "40% !important" }}
            // onClick={postCreation}
          >
            Upload Study Material
          </MDButton>
        </MDBox>
      </Card>
    </MDBox>
  );
};

export default UploadStudyMaterial;
