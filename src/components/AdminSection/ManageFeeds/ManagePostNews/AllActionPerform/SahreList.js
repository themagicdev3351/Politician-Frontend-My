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
import { styled } from "@mui/material/styles";
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { FixedSizeList as VirtualizedList } from "react-window";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import MDTypography from "components/MDTypography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadious: "10px",
};
const SahreList = ({ share, setShare, data, getUserDetails }) => {
  console.log("data", data);
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
  return (
    <ModalComponent open={share} handleClose={() => setShare(false)}>
      <Stack spacing={1} width={350}>
        <MDTypography fontSize="16px" fontWeight="medium">
          Shared By
        </MDTypography>
        {data?.shares.length === 0
          ? "No Share Data found"
          : data?.shares?.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" sx={{ fontSize: "13px" }}>
                      {/* <DeleteIcon /> */}
                      {timeAgo(item?.createdAt)}
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={item?.profileImg ? item?.profileImg?.url : "N/A"} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={item ? item?.userName : "N/A"}
                    // {comments[index]}
                    // secondary="Secondary text"
                  />
                </ListItem>
              );
            })}
      </Stack>
    </ModalComponent>
  );
};

SahreList.propTypes = {
  share: PropTypes.bool.isRequired,
  setShare: PropTypes.bool,
  data: PropTypes.any,
  getUserDetails: PropTypes.func,
};
export default SahreList;
