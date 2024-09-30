import React, { useEffect, useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import PropTypes from "prop-types";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NodataFound from "examples/NotFoundPage/NodataFound";
import MDTypography from "components/MDTypography";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "../../../../../assets/images/deleteIcon.png";
import Like from "../../../../../assets/images/Like.png";
import Comment from "../../../../../assets/images/comment.png";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import apiService from "components/ApiSevices/ApiServices";
import { isLoading, openSnackbar } from "../../../../../redux/action/defaultActions";
import { useDispatch } from "react-redux";
import ReplyBox from "./ReplyBox";
import { getErrorMessage } from "../../../../../examples/CustomError/errorMessages";

export default function CommentList({ comment, setComment, data, getUserDetails }) {
  const actionDispatcher = useDispatch();
  const [like, setLike] = useState({ status: false, id: "" });
  const [textInput, setTextInput] = useState({ open: false, id: "" });
  const [reply, setReply] = useState({ value: "", id: "" });
  const [values, setValues] = useState(null);

  const adminProfile = async () => {
    try {
      const res = await apiService.getAdminProfile();
      setValues(res?.adminData);
    } catch (error) {
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
      console.log("error", error);
    }
  };
  useEffect(() => {
    adminProfile();
  }, []);

  const handleClickLike = async (commentId) => {
    try {
      const res = await apiService.postLike(data._id, commentId);
      getUserDetails();
      setLike(true);
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
  const handleSave = async () => {
    // actionDispatcher(isLoading(true));
    try {
      const res = await apiService.comment(reply);
      getUserDetails();
      setReply({ value: "", id: "" });
      setTextInput({ open: false, id: "" });

      if (res?.success) {
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Comment has been sent successfully", "success"));
      }
    } catch (error) {
      console.log("comment error", error);
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
  const timeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInMs = now - createdDate;

    // Calculate time differences
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximation
    const diffInYears = Math.floor(diffInDays / 365); // Approximation

    // Determine the appropriate time difference string
    if (diffInMinutes < 1) {
      return `just now`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
  };
  const handleReply = async () => {
    // actionDispatcher(isLoading(true));
    try {
      const res = await apiService.ReplyOnComment(reply.value, data._id, textInput.id);
      getUserDetails();
      setReply({ value: "", id: "" });
      setTextInput({ open: false, id: "" });

      if (res?.data?.success) {
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Reply has been sent successfully", "success"));
      }
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
  const displayMessage = (message) => {
    actionDispatcher(
      openSnackbar(`${message} can not be null. Please add ${message} text`, "error")
    );
  };
  const deleteComment = async (commentId) => {
    actionDispatcher(isLoading(true));

    try {
      const res = await apiService.DeleteSingleComment(data._id, commentId);
      getUserDetails();
      if (res?.data?.success) {
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Comment has been deleted successfully", "success"));
      }
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
  const deleteReply = async (commentId, replyId) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.DeleteSingleReply(data._id, commentId, replyId);
      getUserDetails();
      if (res?.data?.success) {
        actionDispatcher(isLoading(false));
        actionDispatcher(openSnackbar("Reply has been deleted successfully", "success"));
      }
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
  const handleCloseLikeField = () => {
    setTextInput({ open: false, id: "" });
  };
  const feedLikeByAdmin = (item) => {
    const LikeByAdmin = item?.likes && item?.likes?.some((like) => like.user._id === values?._id);

    return LikeByAdmin;
  };
  return (
    <Drawer
      open={comment}
      anchor={"right"}
      // onClick={() => { handleCloseLikeField(); setComment(false) }}
    >
      <Box>
        {data?.comments?.length === 0 ? (
          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 1.3 }}
          >
            <MDTypography fontSize="18px" sx={{ ml: 1.5 }} fontWeight="regular">
              No comments yet
            </MDTypography>
            <IconButton size="large" onClick={() => setComment(false)}>
              <CancelIcon />
            </IconButton>
          </Box>
        ) : (
          <List component="nav" aria-labelledby="nested-list-subheader" sx={{ pb: 8 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 1 }}
            >
              <MDTypography fontSize="18px" sx={{ ml: 1 }} fontWeight="regular">
                Comments By
              </MDTypography>
              <IconButton size="large" onClick={() => setComment(false)}>
                <CancelIcon />
              </IconButton>
            </Box>
            {data?.comments?.map((item, index) => {
              return (
                <Box key={item._id} px={1}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                    key={index}
                    ListItemButton
                  >
                    <Stack direction={"row"} minWidth={150} alignItems={"center"} spacing={0.5}>
                      {item?.user === null ? (
                        <Avatar
                          sx={{
                            width: "37px",
                            height: "37px",
                          }}
                        />
                      ) : (
                        <Avatar
                          sx={{
                            width: "37px",
                            height: "37px",
                          }}
                          src={item?.user ? item?.user?.profileImg?.url : "N/A"}
                        />
                      )}
                      <Stack spacing={-1} sx={{ width: "100%", display: "flex" }}>
                        <Box pt={1}>
                          <MDTypography textTransform="capitalize" fontSize="14px">
                            {item?.user == null ? "No user Name" : item?.user?.userName}
                          </MDTypography>
                        </Box>
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                          <ListItemText sx={{ mt: 0.6 }} onClick={() => handleClickLike(item._id)}>
                            {feedLikeByAdmin(item) ? (
                              <ThumbUpIcon sx={{ color: "dodgerblue" }} />
                            ) : (
                              <ThumbUpOffAltIcon />
                            )}
                          </ListItemText>
                          <MDTypography fontSize="16px">
                            {`${
                              item?.numOfLikes > 1000
                                ? `${item?.numOfLikes / 100}K`
                                : item?.numOfLikes
                            } Likes`}
                          </MDTypography>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            onClick={() => setTextInput({ open: !textInput.open, id: item._id })}
                            sx={{ cursor: "pointer", ml: 1.6, mt: -0.2 }}
                          >
                            <img
                              style={{
                                filter:
                                  "sepia(1) hue-rotate(180deg) saturate(500%) brightness(0.3)",
                                width: "18px",
                                height: "18px",
                              }}
                              src={Comment}
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </Stack>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      onClick={() => deleteComment(item._id)}
                    >
                      <img
                        style={{
                          filter: "sepia(1) hue-rotate(180deg) saturate(500%) brightness(0.5)",
                        }}
                        src={DeleteIcon}
                      />
                    </Box>
                  </Box>
                  <Stack ml={5}>
                    <Typography
                      sx={{
                        width: "232px",
                        textWrap: "wrap",
                        fontSize: "15px",
                      }}
                      component="span"
                    >
                      {item?.comment}
                    </Typography>
                    <Typography fontWeight="regular" fontSize="12px">
                      {timeAgo(item?.createdAt)}
                    </Typography>
                  </Stack>
                  <ReplyBox item={item} deleteReply={deleteReply} getTimeDifference={timeAgo} />
                </Box>
              );
            })}
          </List>
        )}

        {!textInput.open ? (
          <Box
            sx={{
              display: "flex",
              position: "fixed",
              alignItems: "center",
              px: 1,
              bottom: 25,
              right: 15,
              bgcolor: "#FBFBFB",
            }}
          >
            <Avatar
              sx={{
                width: "45px",
                height: "45px",
              }}
              src={values?.profileImg?.url}
            />
            <Box sx={{ ml: 0.5, width: 255, bgcolor: "#FBFBFB", borderRadius: "6px" }}>
              <TextField
                fullWidth
                placeholder="add your comment"
                id="query"
                value={reply?.value}
                required
                onChange={(e) => setReply({ value: e.target.value, id: data._id })}
                variant="outlined"
                onKeyDown={(e) => {
                  if (reply.value.length > 0 && e.key === "Enter") {
                    handleSave();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.focus", // Default outline color
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.focus", // Outline color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.main", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main", // Label color when focused
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      disablePointerEvents={reply.value.length === 0}
                      style={{ fontSize: "26px", cursor: "pointer" }}
                      position="end"
                      onClick={
                        reply.value.length === 0
                          ? () => displayMessage("comment")
                          : () => handleSave()
                      }
                    >
                      <SendIcon
                        sx={{ color: reply.value.length === 0 ? "inherited.main" : "primary.main" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "fixed",
              alignItems: "center",
              px: 1,
              bottom: 25,
              right: 15,
              bgcolor: "#FBFBFB",
            }}
          >
            <Avatar
              sx={{
                width: "45px",
                height: "45px",
              }}
              src={values?.profileImg?.url}
            />
            <Box sx={{ ml: 0.5, width: 255, bgcolor: "#FBFBFB", borderRadius: "6px" }}>
              <TextField
                fullWidth
                placeholder="reply on a comment"
                id="query"
                value={reply.value}
                required
                onChange={(e) => setReply({ value: e.target.value, id: data._id })}
                onKeyDown={(e) => {
                  if (reply.value.length > 0 && e.key === "Enter") {
                    handleReply();
                  }
                }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.focus", // Default outline color
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main", // Outline color on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.focus", // Outline color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.main", // Default label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "primary.main", // Label color when focused
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      style={{ fontSize: "26px", cursor: "pointer" }}
                      disablePointerEvents={reply.value.length === 0}
                      position="end"
                      onClick={
                        reply.value.length === 0
                          ? () => displayMessage("reply")
                          : () => handleReply()
                      }
                    >
                      <SendIcon
                        sx={{ color: reply.value.length === 0 ? "inherited.main" : "primary.main" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
CommentList.propTypes = {
  comment: PropTypes.bool.isRequired,
  setComment: PropTypes.bool,
  data: PropTypes.any,
  getUserDetails: PropTypes.func,
};
