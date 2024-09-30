import React, { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Paper, Popover, Stack } from '@mui/material';
import MDTypography from 'components/MDTypography';
import PropTypes from "prop-types";

const QueryFilterComponent = ({ changeFilter, value, changeQueryFilter }) => {
    const [anchorEl, setAnchorEl] = useState(
        null
    );
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    // It is using in popover
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleClick = (
        event,
        _id,
        status
    ) => {
        // setStatus({ ...status, id: _id });
        // console.log("event at newpopover", event)
        setAnchorEl(event.currentTarget);

    };
    return (
        <div>
            <MDTypography onClick={(e) =>
                handleClick(e)
            }>
                <FilterListIcon sx={{ width: "35px", height: "35px" }} />
            </MDTypography>

            {value.TabValue === "Feedback" || value.TabValue === "AllReports" ? <Popover
                id={id}
                elevation={3}
                open={open}
                anchorEl={anchorEl}

                onClose={handleClosePopover}
                // anchorReference="anchorPosition"
                // anchorPosition={{ top: 415, left: 1160 }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Stack
                    direction={"column"}
                    spacing={0.5}
                    component={Paper}
                    variant={'gradient'}
                // sx={{ width: "110px", }}
                >
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            changeFilter('latest')
                            setAnchorEl(null);
                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >Latest</MDTypography>
                    </Box>
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        width: "100px",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            setAnchorEl(null);
                            changeFilter('oldest')

                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >Oldest</MDTypography>
                    </Box>

                </Stack>
            </Popover> : <Popover
                id={id}
                elevation={3}
                open={open}
                anchorEl={anchorEl}

                onClose={handleClosePopover}
                // anchorReference="anchorPosition"
                // anchorPosition={{ top: 415, left: 1160 }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Stack
                    direction={"column"}
                    spacing={0.5}
                    component={Paper}
                    variant={'gradient'}
                // sx={{ width: "110px", }}
                >
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            changeQueryFilter('')
                            setAnchorEl(null);
                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >All</MDTypography>
                    </Box>
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        width: "100px",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            setAnchorEl(null);
                            changeQueryFilter('Mentorship')

                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >Mentorship</MDTypography>
                    </Box>
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        width: "100px",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            setAnchorEl(null);
                            changeQueryFilter('Complain')

                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >Complain</MDTypography>
                    </Box>
                    <Box sx={{
                        display: "flex", cursor: "pointer", color: "#6E6B7B", textDecoration: "none",
                        width: "100px",
                        justifyContent: "center",
                        "&:hover": {
                            bgcolor: "#FF8906",
                            borderRadius: "5px",
                            color: "white"
                        }
                    }}
                        onClick={() => {
                            setAnchorEl(null);
                            changeQueryFilter('Suggestion')

                        }}
                    >
                        <MDTypography
                            sx={{
                                fontSize: "14px",
                                py: .5,
                                "&:hover": {
                                    color: "white.main"
                                }
                            }}
                        >Suggestion</MDTypography>
                    </Box>
                </Stack>
            </Popover>
            }
        </div>
    )
}
QueryFilterComponent.propTypes = {
    changeFilter: PropTypes.func,
    changeQueryFilter: PropTypes.func,
    value: PropTypes.obj,
};
export default QueryFilterComponent