import * as React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Chip, Grid, Link, Stack, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import MDBox from "components/MDBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "../../../../components/ApiSevices/ApiServices";
import dayjs from "dayjs";
import LikesList from "./AllActionPerform/LikesList";
import CommentList from "./AllActionPerform/CommentList";
import SahreList from "./AllActionPerform/SahreList";
import { Icon } from "@iconify/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MDButton from "components/MDButton";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";
import { openSnackbar } from "../../../../redux/action/defaultActions";

function ViewNews() {
  const [seeMoreCharLength, setSeeMoreCharLength] = useState(1000);
  const { state } = useLocation();
  const actionDispatcher = useDispatch();
  const theme = useTheme();
  // const id = useParams()
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxSteps, setMaxSteps] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(false);
  const [share, setShare] = useState(false);
  const [data, setData] = useState();
  const [values, setValues] = useState({});

  const handleOpen = (value) => {
    if (value === "like") {
      setOpen(!open);
    } else if (value === "comment") {
      setComment(!comment);
    } else {
      setShare(!share);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  // ***********************  GET SINGLE USER DETAILS  ***********************************
  const getUserDetails = async () => {
    try {
      const data = await apiService.singleUserNews(state.postId);
      // console.log("singleDataNewssss==>", data?.newsFeed)
      setData(data?.newsFeed);
      setMaxSteps(data?.mediaFilesLength);
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
  const adminProfile = async () => {
    try {
      const res = await apiService.getAdminProfile();
      setValues(res?.adminData);
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
  useEffect(() => {
    adminProfile();
  }, []);
  // *********************************************************\
  useEffect(() => {
    getUserDetails();
  }, []);

  function scrollToBottom() {
    // Scroll to the bottom of the page
    window.scrollTo({
      bottom: 0,
      behavior: "smooth", // Optional: Smooth scrolling
    });
  }
  const handleClickLike = async (feedId) => {
    try {
      const res = await apiService.LikeOnFeed(feedId);
      getUserDetails();
      console.log("handleClickLike res", res);
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
    // setLike(!like);
  };
  const feedLikeByAdmin = data?.likes.some((like) => like.user._id === values?._id);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: "flex", justifyContent: "end" }} onClick={() => navigate(-1)}>
        <Button
          variant="contained"
          size="small"
          sx={{
            color: "white !important",
            bgcolor: "#FF7518 !important",
            outlineColor: "#FF7518 !important",
            borderColor: "#FF7518",
          }}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <Grid container spacing={2}>
        {data?.newsMediaFiles && data?.newsMediaFiles.length > 0 ? (
          <Grid item xs={12} sm={5} md={4}>
            <Box sx={{ flexGrow: 1 }}>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                style={{ borderRadius: "15px" }}
                enableMouseEvents
              >
                {/* {console.log("firstSTEP", data)} */}
                {data?.newsMediaFiles?.map((step, index) => (
                  <MDBox key={index}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      step?.contentType === "image/jpeg" ||
                      step?.contentType === "image/jpg" ||
                      step?.contentType === "image/png" ||
                      step?.contentType === "image/webp" ? (
                        <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: "block",
                            maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          src={step.url}
                          alt="newsPost"
                        />
                      ) : (
                        <Box
                          component="video"
                          sx={{
                            height: 255,
                            display: "block",
                            maxWidth: 400,
                            overflow: "hidden",
                            width: "100%",
                          }}
                          controls
                        >
                          <source src={step.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </Box>
                      )
                    ) : null}
                  </MDBox>
                ))}
              </SwipeableViews>
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </Box>
          </Grid>
        ) : (
          <Box
            sx={{
              width: 350,
              ml: 3,
              border: "1px solid gray",
              height: 255,
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MDTypography variant="outlined" color="secondary">
              No Images & Videos
            </MDTypography>
          </Box>
        )}

        <Grid item xs={12} sm={7} md={8}>
          <Stack
            direction={"row"}
            width={"100%"}
            sx={{ overflow: "auto", textWrap: "wrap", wordBreak: "break-word" }}
            my={2}
            px={2}
          >
            <MDTypography
              variant="h6"
              textWrap="wrap"
              sx={{ letterSpacing: "1px", textTransform: "capitalize" }}
              fontSize={"16px"}
              fontWeight={"bold"}
            >
              {data?.title}
            </MDTypography>
          </Stack>

          {/* <MDBox > */}
          <Stack direction="row" px={2} spacing={1}>
            {data?.hashtags.map((item, index) => {
              return <Chip key={index} label={item} />;
            })}
          </Stack>
          {/* </MDBox> */}

          {data?.location ? (
            <Stack mt={1} mb={0} px={2} direction={"row"}>
              <MDTypography
                variant="outline"
                fontSize={"16px"}
                fontWeight={"900"}
                maxWidth={"30rem"}
                component="p"
                textTransform={"uppercase"}
              >
                {data?.location}
              </MDTypography>
            </Stack>
          ) : (
            ""
          )}

          <MDBox
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            my={0.5}
            px={2}
          >
            <MDTypography variant="outline" sx={{ cursor: "pointer" }}>
              <Icon
                onClick={() => handleClickLike(data._id)}
                fontSize="small"
                style={{
                  height: "25px",
                  fontSize: "22px",
                  color: feedLikeByAdmin ? "dodgerblue" : "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
                icon={"ant-design:like-filled"}
              />
            </MDTypography>
            &nbsp;
            <MDTypography
              mb={1}
              ml={0.6}
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpen("like")}
            >{`${
              data?.numOfLikes > 1000 ? `${data?.numOfLikes / 100}K` : data?.numOfLikes
            }`}</MDTypography>
            &nbsp;&nbsp;
            <MDTypography
              variant="outline"
              onClick={() => handleOpen("comment")}
              sx={{ cursor: "pointer" }}
            >
              {/* <ChatBubbleIcon /> */}
              {/* <iconify-icon icon="iconamoon:comment-fill"></iconify-icon> */}
              <Icon
                fontSize="small"
                style={{
                  height: "25px",
                  fontSize: "22px",
                  color: "gray",
                  "&:hover": {
                    color: "red",
                  },
                }}
                icon={"iconamoon:comment-fill"}
              />
            </MDTypography>
            &nbsp;
            <MDTypography mb={1}>{data?.NumOfComments}</MDTypography>&nbsp;&nbsp;
            <MDTypography
              variant="outline"
              onClick={() => handleOpen("share")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  "&>": {
                    color: "red",
                  },
                },
              }}
            >
              {/* <ShareIcon /> */}
              {/* <iconify-icon icon="solar:share-line-duotone"></iconify-icon> */}
              {/* This is Share */}
              <Icon
                fontSize="small"
                style={{
                  height: "25px",
                  fontSize: "22px",
                  color: "gray",
                }}
                icon={"mage:share-fill"}
              />
            </MDTypography>
            &nbsp;
            <MDTypography mb={1}>{data?.numOfShares}</MDTypography>&nbsp;
            <LikesList open={open} setOpen={setOpen} data={data} getUserDetails={getUserDetails} />
            <CommentList
              comment={comment}
              setComment={setComment}
              data={data}
              getUserDetails={getUserDetails}
            />
            <SahreList
              share={share}
              setShare={setShare}
              data={data}
              getUserDetails={getUserDetails}
            />
          </MDBox>

          {data?.newsUrl ? (
            <Stack px={2} direction={"row"}>
              <MDTypography
                variant="outline"
                fontSize={"16px"}
                fontWeight={"900"}
                maxWidth={"30rem"}
              >
                <Link
                  href={data?.newsUrl}
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: "0.8rem", color: "blue" }}
                >
                  {`URL:${data?.newsUrl}`}
                </Link>
              </MDTypography>
            </Stack>
          ) : (
            ""
          )}
        </Grid>

        {!data?.newsUrl ? (
          <Grid item container xs={12} sm={12} md={12}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              display={"flex"}
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <MDTypography fontWeight={"bold"} fontSize={"16px"}>
                Description
              </MDTypography>
              <MDTypography sx={{ color: "#FF7518" }} fontWeight={"bold"} fontSize={"0.9rem"}>
                {dayjs(data?.createdAt).format("YYYY-MM-DD , hh:mm A")}
              </MDTypography>
            </Grid>
            <Grid
              mt={0.5}
              item
              xs={12}
              sm={12}
              md={12}
              sx={{ transition: "all 300ms ease-in-out" }}
            >
              <MDTypography
                component={"p"}
                fontWeight={"400px"}
                fontSize={"16px"}
                sx={{
                  overflow: "auto",
                  textWrap: "wrap",
                  wordBreak: "break-word",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp:
                    seeMoreCharLength <= 500 ? "unset" : Math.ceil(seeMoreCharLength / 200) * 3, // Controls number of lines
                  overflow: "hidden",
                  maxHeight:
                    seeMoreCharLength <= 500
                      ? "none"
                      : `${Math.ceil(seeMoreCharLength / 400) * 4.5}rem`,
                  transition: "max-height 0.5s ease", // Smooth expand/collapse transition
                }}
              >
                {data?.description?.substring(0, seeMoreCharLength)}{" "}
                {data?.description?.length > seeMoreCharLength ? (
                  <span
                    onClick={() => {
                      scrollToBottom();
                      setSeeMoreCharLength((el) => el + 500);
                    }}
                    style={{ color: "#FF7518", textDecoration: "underline", cursor: "pointer" }}
                  >
                    ...see more
                  </span>
                ) : (
                  ""
                )}
              </MDTypography>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </DashboardLayout>
  );
}

export default ViewNews;
