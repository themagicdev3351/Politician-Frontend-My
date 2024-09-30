import * as React from "react";

import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Box, Button, Chip, Grid, Link, Stack, useTheme } from "@mui/material";

import MDBox from "components/MDBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import apiService from "components/ApiSevices/ApiServices";
import dayjs from "dayjs";
import LikesList from "./AllActionPerform/LikesList";
import CommentList from "./AllActionPerform/CommentList";
import SahreList from "./AllActionPerform/SahreList";
import { Icon } from "@iconify/react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import CommentList from './AllActionPerform/CommentList';
// import SahreList from './AllActionPerform/SahreList';

function ViewSocialMedia() {
  const [seeMoreCharLength, setSeeMoreCharLength] = useState(1000);
  const { state } = useLocation();
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

  const adminProfile = async () => {
    try {
      const res = await apiService.getAdminProfile();
      setValues(res?.adminData);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    adminProfile();
  }, []);
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
      const data = await apiService.singleUserSocialMedia(state.postId);
      console.log("singleSocialMediaPost=====>==>", data);
      setData(data?.post);
      setMaxSteps(data?.mediaFilesLength);
    } catch (error) {
      console.log("error", error);
    }
  };
  // *********************************************************\
  useEffect(() => {
    getUserDetails();
  }, []);

  function scrollToBottom() {
    window.scrollTo({
      bottom: 0,
      behavior: "smooth",
    });
  }

  const handleClickLike = async (feedId) => {
    try {
      const res = await apiService.LikeOnFeed(feedId);
      getUserDetails();
      console.log("handleClickLike res", res);
    } catch (error) {
      actionDispatcher(isLoading(false));
      actionDispatcher(openSnackbar(error?.response?.data?.error, "error"));
    }
  };

  // Function to extract YouTube video ID from URL
  const extractVideoID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  };

  const YoutubeThumbnail = (url) => {
    const videoID = extractVideoID(url);
    const thumbnailUrl = videoID ? `https://img.youtube.com/vi/${videoID}/hqdefault.jpg` : "";
    return thumbnailUrl;
  };
  // const feedLikeByAdmin = () => {
  //   const LikeByAdmin = data?.likes?.map((newData) => {
  //      console.log("newData", newData)

  //     if (newData.user._id
  //       === values?._id) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   })
  //   // console.log("LikeByAdmin length", LikeByAdmin)

  //   return LikeByAdmin?.length === 0 ? false : LikeByAdmin
  // }
  const feedLikeByAdmin = data?.likes.some(like => like.user._id === values?._id);

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
        <Grid item xs={12} sm={5} md={4} display={'flex'} flexDirection={'row'}>
          <Stack mx={2} direction={"row"} width={400}>
            <MDTypography variant="outline" fontSize={"16px"} fontWeight={"900"} maxWidth={"30rem"}>
              <Link
                href={data?.mediaUrl}
                target="_blank"
                rel="noopener"
                style={{ fontSize: "0.8rem", color: "blue" }}
              >
                <img src={YoutubeThumbnail(data?.mediaUrl)} alt="thumbnail" width={300} />
                {`URL:${data?.mediaUrl}`}
              </Link>
            </MDTypography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={7} md={8} display={'flex'} flexDirection={'row'}>
          <Box>
            <Stack direction={"row"}>
              <MDTypography variant="outline" fontSize={"16px"} fontWeight={"900"}>
                {data?.title}
              </MDTypography>
            </Stack>

            <MDBox >
              <Stack direction="row" spacing={1}>
                {data?.hashtags.map((item, index) => {
                  return <Chip key={index} label={item} />;
                })}
              </Stack>

              <MDBox
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                my={0.5}

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

                <MDTypography mb={1} ml={.6}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleOpen("like")}
                >{`${data?.numOfLikes > 1000
                  ? `${data?.numOfLikes / 100}K`
                  : data?.numOfLikes
                  }`}</MDTypography>&nbsp;&nbsp;
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
                <CommentList comment={comment} setComment={setComment} data={data} getUserDetails={getUserDetails} />
                <SahreList share={share} setShare={setShare} data={data} getUserDetails={getUserDetails} />
              </MDBox>
            </MDBox>
          </Box>
        </Grid>
      </Grid>
      {!data?.newsUrl ? (
        <Grid mx={2} item container xs={12} sm={12} md={12}>
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
    </DashboardLayout>
  );
}

export default ViewSocialMedia;
