import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Popover from "@mui/material/Popover";
import dayjs from "dayjs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
// import { isLoading, openSnackbar } from '../../../../redux/action/defaultActions';
import NodataFound from "examples/NotFoundPage/NodataFound";
import Table from "examples/ReusableTable/Table";
import { useEffect, useState } from "react";
import CustomToolbar from "examples/CustomToolbar/CustomToolbar";
import apiService from "components/ApiSevices/ApiServices";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import FilterComponent from "./FilterComponent";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import PartyWorkerToolbar from "./PartyWorkerToolbar";

const ApprovePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [preview, setPreview] = useState({ open: false, id: "" });
    const [pertyWorkerId, setpertyWorkerId] = useState("");
    const [posts, setposts] = useState([]);
    const [filter, setFilter] = useState(null);
    const [active, setActive] = useState({
        id: "",
        status: false,
    });

    // FOr pagination
    const [paginationData, setPaginationData] = useState({
        limitPerPage: 5,
        totalData: 17,
        totalPages: 4,
        currentPage: 1,
    });
    // console.log("pagination data", paginationData)
    const Allposts = async (e) => {
        // dispatch(isLoading(true));
        try {
            // const res = await apiService.AllPartyWorkerPost(paginationData, filter);
            const res = await apiService.AllPartyWorkerPost(paginationData);
            if (res?.data.success) {
                setPaginationData(res?.data.pageInfo);
                setposts(res?.data.allPosts);
                dispatch(isLoading(false));
            }

            // console.log("get  allposts", res)
        } catch (error) {
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
        Allposts();
    }, [paginationData.currentPage, paginationData.limitPerPage, filter]);
    // To Open View Profile and delete Popover
    const [anchorEl, setAnchorEl] = useState(null);
    // To open delete modal
    const [dialog, setDialog] = useState({
        open: false,
        title: "",
        message: "",
        buttonText: "",
        data: {
            userId: null,
        },
    });
    // To change pagination
    const changePage = (currentPage) => {
        setPaginationData({ ...paginationData, currentPage });
    };
    // to close the popover
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    // It is using in popover
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    //  to format the time
    const timeFormater = (date) => {
        const currentTime = dayjs(date);
        const formattedTime = currentTime.format("h:mm A");
        const formatedDate = currentTime.format("DD-MM-YYYY");

        return `${formatedDate}`;
    };
    const changePageSize = (limitPerPage) => {
        setPaginationData({ ...paginationData, currentPage: 1, limitPerPage });
    };
    const handleClose = () => {
        setAnchorEl(null);

        setDialog({
            open: false,
            title: "",
            message: "",
            buttonText: "",
        });
    };
    const handleClick = (event, _id, status, workerId) => {
        setpertyWorkerId(workerId)
        setDialog({
            ...dialog,
            data: {
                userId: _id,
            },
        });
        setActive({ id: _id, status: status });
        setAnchorEl(event.currentTarget);
    };
    const processData = (data) => {
        return data.map((item, index) => ({
            ...item,
            index: index + 1, // Add 1 to start index from 1
        }));
    };
    const rows = processData(posts);
    const columns = [
        {
            field: "index",
            headerName: <MDTypography fontSize="15px">Sr. No</MDTypography>,
            width: 80,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <MDTypography
                        fontSize="15px"
                        sx={{
                            py: 1.8,
                        }}
                    >
                        {params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "title",
            headerName: <MDTypography fontSize="15px">Title</MDTypography>,
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                // textWrap: "wrap",
                                // py: 1,
                                fontSize: "15px",
                                width: "230px",
                                py: 1,
                                overflow: "hidden", // Hides overflow content
                                whiteSpace: "nowrap", // Prevents text from wrapping
                                textOverflow: "ellipsis",
                            }}
                        >
                            {params.value}
                        </MDTypography>
                    </>
                );
            },
        },
        {
            field: "createdAt",
            headerName: <MDTypography fontSize="15px">Date & Time</MDTypography>,
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                fontSize: "15px",
                                width: "210px",
                                textWrap: "wrap",
                                py: 1.8,
                            }}
                        >
                            {timeFormater(params.value)}
                        </MDTypography>
                    </>
                );
            },
        },
        {
            field: "numOfLikes",
            headerName: <MDTypography fontSize="15px">Likes</MDTypography>,
            width: 80,
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                fontSize: "15px",
                                textWrap: "wrap",
                                py: 1.8,
                            }}
                        >
                            {params.value == null ? "0" : params.value}
                        </MDTypography>
                    </>
                );
            },
        },
        {
            field: "NumOfComments",
            headerName: <MDTypography fontSize="15px">Comments</MDTypography>,
            width: 100,
            renderCell: (params) => {
                return (
                    <MDTypography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            py: 1.8,
                        }}
                    >
                        {params.value == null ? "0" : params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "NumOfShares",
            headerName: <MDTypography fontSize="15px">Share</MDTypography>,
            width: 100,
            renderCell: (params) => {
                return (
                    <MDTypography
                        sx={{
                            fontSize: "14px",
                            fontWeight: "400",
                            py: 1.8,
                        }}
                    >
                        {params.value == null ? "0" : params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "Preview",
            headerName: <MDTypography fontSize="15px">Preview</MDTypography>,
            width: 90,
            // align: "center",
            renderCell: (params) => {
                return (
                    <MDTypography
                        sx={{
                            fontSize: "15.33px",
                            fontWeight: "400",
                            color: "#FF8906",
                            cursor: "pointer",
                            py: 1.6,
                        }}

                        onClick={() => navigate(`/ManagePost/viewPost`, { state: { postId: params?.row?._id } })
                        }
                    >
                        View
                    </MDTypography>
                );
            },
        },
        {
            field: "isActive",
            headerName: <MDTypography fontSize="15px">Status</MDTypography>,
            width: 120,
            renderCell: (params) => {
                return (
                    <>
                        <MDBox width="100%">
                            <Chip
                                label={params.value ? "Active" : "Pending"}
                                color={params.value ? "success" : "warning"}
                                size="small"
                                sx={{ borderRadius: "5px", minWidth: "6rem", color: "white !important" }}
                            />
                        </MDBox>
                    </>
                );
            },
        },
        {
            field: "Action",
            headerName: <MDTypography fontSize="15px">Action</MDTypography>,
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                fontSize: "20.33px",
                                fontWeight: "400",
                                cursor: "pointer",
                                py: 1.6,
                            }}
                            onClick={(e) => handleClick(e, params.row._id, params.row.isActive, params.row.user._id)}
                        >
                            <MoreVertIcon />
                        </MDTypography>
                        <Popover
                            id={id}
                            elevation={3}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClosePopover}
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
                                sx={{ width: "90px" }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        color: "#6E6B7B",
                                        textDecoration: "none",
                                        // width: "138px",
                                        justifyContent: "center",
                                        "&:hover": {
                                            bgcolor: "#FF8906",
                                            borderRadius: "5px",
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => {
                                        setDialog({
                                            open: true,
                                            title: `are you sure you want to approve this`,
                                            message: "post ?",
                                            buttonText: "Approve",
                                            data: {
                                                postId: active.id,
                                            },
                                        });
                                        setAnchorEl(null);
                                    }}
                                >
                                    <MDTypography
                                        sx={{
                                            fontSize: "14px",
                                            py: 0.5,
                                            "&:hover": {
                                                color: "white.main",
                                            },
                                        }}
                                    >
                                        Approve
                                    </MDTypography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        color: "#6E6B7B",
                                        textDecoration: "none",
                                        // width: "138px",
                                        justifyContent: "center",
                                        "&:hover": {
                                            bgcolor: "#FF8906",
                                            borderRadius: "5px",
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => {
                                        setDialog({
                                            open: true,
                                            title: `are you sure you want to reject this`,
                                            message: "Post ?",
                                            buttonText: "Reject",
                                            data: {
                                                postId: active.id,
                                            },
                                        });
                                        setAnchorEl(null);
                                    }}
                                >
                                    <MDTypography
                                        sx={{
                                            fontSize: "14px",
                                            py: 0.5,
                                            "&:hover": {
                                                color: "white.main",
                                            },
                                        }}
                                    >
                                        Reject
                                    </MDTypography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        cursor: "pointer",
                                        color: "#6E6B7B",
                                        textDecoration: "none",
                                        // width: "138px",
                                        justifyContent: "center",
                                        "&:hover": {
                                            bgcolor: "#FF8906",
                                            borderRadius: "5px",
                                            color: "white",
                                        },
                                    }}
                                    onClick={() => {
                                        navigate("/PartyWorkerPreview", { state: { active: { id: pertyWorkerId, status: true } } });
                                    }}
                                >
                                    <MDTypography
                                        sx={{
                                            fontSize: "14px",
                                            py: 0.5,
                                            "&:hover": {
                                                color: "white.main",
                                            },
                                        }}
                                    >
                                        View Profile
                                    </MDTypography>
                                </Box>
                            </Stack>
                        </Popover>
                    </>
                );
            },
        },
    ];
    const changeFilter = (newFilter) => {
        setFilter(newFilter);
        console.log("newFilter", newFilter);
    };
    const deactivatePost = async () => {
        dispatch(isLoading(true));

        try {
            const res = await apiService.DeactivatePartyWorkerPost(active);
            if (res?.data.success) {
                handleClose()
                Allposts();
                dispatch(openSnackbar(`Post updated successfully`, "success"));
                dispatch(isLoading(false));
            }
        } catch (error) {
            dispatch(isLoading(false));
            dispatch(openSnackbar(error?.response?.data?.message, "error"));
        }
    };
    return (
        <>
            <Stack direction={"column"}>
                <Box mt={2}>
                    {/* Table component */}
                    {/* {posts?.length == 0 ? (
                        <NodataFound />
                    ) : ( */}
                    <Table
                        rows={rows}
                        columns={columns}
                        CustomToolbar={() =>
                            PartyWorkerToolbar(paginationData.limitPerPage, changePageSize, changeFilter)
                        }
                        pageCount={paginationData.totalPages}
                        pageInfo={paginationData}
                        changePage={changePage}
                    />
                    {/* )} */}
                </Box>
            </Stack>
            {dialog.open && (
                <>
                    <DeleteModal
                        open={dialog.open}
                        handleClose={handleClose}
                        dialog={dialog}
                        deleteFunc={() => deactivatePost()}
                        buttonText={
                            dialog.buttonText === "Approve"
                                ? "Approve"
                                : dialog.buttonText === "Reject"
                                    ? "Reject"
                                    : "Delete"
                        }
                        Icon={
                            dialog.buttonText === "Approve" ? (
                                <img src="/protection.png" alt="del" width={50} />
                            ) : dialog.buttonText === "reject" ? (
                                <img src="/shield2.png" alt="del" width={50} />
                            ) : (
                                ""
                            )
                        }
                    />
                </>
            )}
        </>


    )
}

export default ApprovePost