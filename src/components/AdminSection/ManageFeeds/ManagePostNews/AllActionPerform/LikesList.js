import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { FixedSizeList as VirtualizedList } from "react-window";
import { useEffect } from "react";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import MDTypography from "components/MDTypography";

const LikesList = ({ open, setOpen, data }) => {
  const totalHeight = 400; // Total height of the VirtualizedList
  const itemCount = data?.likes?.length || 0; // Number of items
  const itemSize = itemCount > 0 ? Math.floor(totalHeight / itemCount) : 70; // Ensure a minimum itemSize of 70 if there are no items

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
  console.log("data at likes", data?.likes);
  return (
    <ModalComponent open={open} handleClose={() => setOpen(false)}>
      <Stack spacing={1} width={250}>
        <MDTypography fontSize="16px" fontWeight="medium">
          Liked By
        </MDTypography>
        {data?.likes.length === 0
          ? "No Likes found"
          : data?.likes?.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  // secondaryAction={
                  //     <IconButton edge="end" aria-label="delete" sx={{ fontSize: "13px" }}>
                  //         {/* <DeleteIcon /> */}
                  //         {timeAgo(item?.createdAt)}
                  //     </IconButton>
                  // }
                >
                  <ListItemAvatar>
                    <Avatar src={item?.user ? item?.user.profileImg?.url : "N/A"} />
                  </ListItemAvatar>
                  <ListItemText secondary={item?.user ? item?.user.userName : "N/A"} />
                </ListItem>
              );
            })}
      </Stack>
    </ModalComponent>
  );
};

LikesList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.bool,
  data: PropTypes.any,
};
export default LikesList;
