import React, { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Paper, Popover, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

const FilterComponent = ({ changeFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  // It is using in popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event, _id, status) => {
    // setStatus({ ...status, id: _id });
    console.log("event at newpopover", event);
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <MDTypography onClick={(e) => handleClick(e)}>
        <FilterListIcon sx={{ width: "32px", height: "32px" }} />
      </MDTypography>

      <Popover
        id={id}
        elevation={3}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        // anchorReference="anchorPosition"
        // anchorPosition={{ top: 415, left: 1160 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Stack
          direction={"column"}
          spacing={0.5}
          component={Paper}
          variant={"gradient"}
          // sx={{ width: "110px", }}
        >
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              color: "#6E6B7B",
              textDecoration: "none",
              width: "138px",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#FF8906",
                borderRadius: "5px",
                color: "white",
                "& p": {
                  color: "white !important",
                },
              },
            }}
            onClick={() => {
              changeFilter(false);
              setAnchorEl(null);
            }}
          >
            <MDTypography
              sx={{
                fontSize: "14px",
                py: 0.5,
                // "&:hover": {
                //     color: "white.main"
                // }
              }}
            >
              Pending
            </MDTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              color: "#6E6B7B",
              textDecoration: "none",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#FF8906",
                borderRadius: "5px",
                color: "white",
                "& p": {
                  color: "white !important",
                },
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              changeFilter(true);
            }}
          >
            <MDTypography
              sx={{
                fontSize: "14px",
                py: 0.5,
                "&:hover": {
                  color: "white.main",
                  "& p": {
                    color: "white !important",
                  },
                },
              }}
            >
              Accepted
            </MDTypography>
          </Box>
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              color: "#6E6B7B",
              textDecoration: "none",
              width: "138px",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#FF8906",
                borderRadius: "5px",
                color: "white",
                "& p": {
                  color: "white !important",
                },
              },
            }}
            onClick={() => {
              setAnchorEl(null);
              changeFilter("");
            }}
          >
            <MDTypography
              sx={{
                fontSize: "14px",
                py: 0.5,
                "&:hover": {
                  color: "white.main",
                  "& p": {
                    color: "white !important",
                  },
                },
              }}
            >
              All
            </MDTypography>
          </Box>
        </Stack>
      </Popover>
    </div>
  );
};
FilterComponent.propTypes = {
  changeFilter: PropTypes.func,
};
export default FilterComponent;
