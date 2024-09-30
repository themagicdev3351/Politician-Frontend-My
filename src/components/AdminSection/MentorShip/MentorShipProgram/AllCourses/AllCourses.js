import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const dummyCourses = [
  "UPSC : Union Public Service Commission",
  "UPSC : Union Public Service Commission",
  "UPSC : Union Public Service Commission",
  "UPSC : Union Public Service Commission",
  "UPSC : Union Public Service Commission",
  "UPSC : Union Public Service Commission",
];

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../../redux/action/defaultActions";
import DeleteConfirmationModal from "assets/theme/components/modal/DeleteConfirmationModal";

const AllCourses = () => {
  const [activeEditIndex, setactiveEditIndex] = useState(null);
  const [coursesNames, setCoursesNames] = useState([]);
  const [tempValues, setTempValues] = useState([]);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [targetIdToDelete, setTargetIdToDelete] = useState(null);
  const actionDispatcher = useDispatch();

  console.log("===uuuu===>", tempValues);

  const openModal = () => setopenDeleteModal(true);
  const closeModal = () => setopenDeleteModal(false);

  //update the courese values
  const handleUpdateCoureseName = (e, index) => {
    console.log("index==>", activeEditIndex);
    console.log("hit");
    const { value, name } = e.target;
    console.log("value", value);
    const temp = [...coursesNames];
    temp[index].course = value;
    setCoursesNames([...temp]);
  };

  // handleclose active index
  const handleCloseActiveIndex = async () => {
    // setCoursesNames([...tempValues]);
    await handleRefresh();
    setactiveEditIndex(null);
  };

  const handleClose = () => {
    setTargetIdToDelete(null);
    closeModal();
  };

  // addd coursename
  const handleAddCourseName = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));
    const courseNameValue = document.getElementById("coursename").value;
    console.log("courseName==>", courseNameValue);
    try {
      const res = await axios.post("/api/v1/admin/add/course/name", {
        courseName: courseNameValue,
      });
      actionDispatcher(openSnackbar("Course name is added successfully", "success"));
      document.getElementById("coursename").value = "";
      await getAllCourses();
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error=>", error);
    }
  };

  // get all availables courses
  const getAllCourses = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get/all/course/names");
      console.log("res====>", res);
      setCoursesNames([...res?.data?.courseNames]);
      setTempValues([...res?.data?.courseNames]);
      console.log("---");
    } catch (error) {
      console.log("error=>", error);
    }
  };

  // update the course name
  const handleUpdateCourseName = async (targetId, updatedName) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.put("/api/v1/admin/update/course/name", {
        courseNameId: targetId,
        newCourseName: updatedName,
      });
      actionDispatcher(openSnackbar("Course name is updated successfully", "success"));
      setactiveEditIndex(null);
      getAllCourses();
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error=>", error);
    }
  };

  // delete the course name
  const handleDeleteCourse = async (targetId) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await axios.delete(`/api/v1/admin/delete/course/name?courseNameId=${targetId}`);

      handleClose();
      actionDispatcher(openSnackbar("Course name is deleted successfully", "success"));
      getAllCourses();
      actionDispatcher(isLoading(false));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error=>", error);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  const handleRefresh = async () => {
    getAllCourses();
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={4}>
          <MDBox
            sx={{
              marginRight: "1rem",
              width: "100%",
              display: "flex",
              justifyContent: "start",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MDBox
              sx={{
                // borderBottom: "0.5px solid #d9d9d9",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
              }}
            >
              <Stack>
                <label htmlFor="coursename" style={{ fontWeight: "bold" }}>
                  Add course names here
                </label>
              </Stack>
              <form onSubmit={handleAddCourseName} id="addCourseName">
                <Stack
                  width={{ md: "50%", xs: "100%" }}
                  direction={"row"}
                  alignItems={"start"}
                  justifyContent={"space-between"}
                  columnGap={2}

                  // bgcolor={"yellow"}
                >
                  {/* <FormLabel>Write the name of the Course</FormLabel> */}
                  <TextField
                    id="coursename"
                    variant="outlined" // label="Write the name of the Course"
                    fullWidth
                    multiline
                    minRows={3}
                    required
                    // value={}
                    // onChange={handleChange}
                    inputProps={{
                      maxLength: 100, // Set max character limit
                    }}
                    placeholder="UPSC : Union Public Service Commission"
                    aria-describedby="UPSC : Union Public Service Commission"
                    helperText={`word limit 100`}
                  />

                  <Button
                    variant="contained"
                    // size="small"
                    type="submit"
                    color="primary"
                    sx={{
                      bgcolor: "orange",
                      color: "text.primary",
                      "&:hover": {
                        bgcolor: "orange",
                        color: "white !important",
                      },
                    }}
                  >
                    Add
                  </Button>
                </Stack>
              </form>
              <Stack width={{ md: "50%", xs: "100%" }}>
                <Typography variant="h6" mt={4}>
                  All Courses
                </Typography>
                <Stack mt={2}>
                  <Grid
                    container
                    rowGap={4}
                    sx={{
                      height: "400px",
                      overflow: "auto",
                      alignContent: "start",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "orange",
                        borderRadius: "10px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "darkorange",
                      },
                    }}
                  >
                    {coursesNames && coursesNames?.length > 0 ? (
                      [...coursesNames]?.map((course, index) => {
                        return (
                          <Grid
                            item
                            key={index}
                            xs={12}
                            px={2}
                            py={1}
                            // component={Paper}
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            sx={{
                              background: "rgba(232, 236, 241,1)",
                              borderRadius: "5px",
                              maxHeight: "80px",
                            }}
                            border={"1px solid #DBDADE"}
                          >
                            <TextField
                              value={course.course}
                              fullWidth
                              disabled={index === activeEditIndex ? false : true}
                              name={`course${index}`}
                              required
                              placeholder="This Field cant not be empty"
                              onChange={(e) => handleUpdateCoureseName(e, index)}
                              sx={{
                                width: "85%",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "none", // Removes the outline
                                  },
                                  "&:hover fieldset": {
                                    border: "none", // Removes the outline on hover
                                  },
                                  "&.Mui-focused fieldset": {
                                    border: "none", // Removes the outline on focus
                                  },
                                },
                              }}
                            />
                            <Stack
                              direction={"row"}
                              fontSize={"28px"}
                              columnGap={index === activeEditIndex ? 0.5 : 2}
                            >
                              {index === activeEditIndex ? (
                                <>
                                  <CheckIcon
                                    color="success"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleUpdateCourseName(course._id, course.course)
                                    }
                                  />
                                  <CloseIcon
                                    color="error"
                                    sx={{ cursor: "pointer" }}
                                    onClick={handleCloseActiveIndex}
                                  />
                                </>
                              ) : (
                                <>
                                  <span>
                                    <img
                                      alt="del"
                                      src="/deleteIcon.svg"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        openModal();
                                        setTargetIdToDelete(course._id);
                                      }}
                                    />
                                  </span>

                                  <span>
                                    <img
                                      alt="del"
                                      src="/editIcon.svg"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => setactiveEditIndex(index)}
                                    />
                                  </span>
                                </>
                              )}
                            </Stack>
                            <DeleteConfirmationModal
                              open={openDeleteModal && course._id === targetIdToDelete}
                              handleClose={handleClose}
                              handleAction={() => handleDeleteCourse(course._id)}
                              message="Are you sure, you want to delete this post?"
                              handleCancel={handleClose}
                            />
                          </Grid>
                        );
                      })
                    ) : (
                      <MDBox
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <MDTypography>No Couses Added Yet</MDTypography>
                      </MDBox>
                    )}
                  </Grid>
                </Stack>
              </Stack>
            </MDBox>
          </MDBox>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default AllCourses;
