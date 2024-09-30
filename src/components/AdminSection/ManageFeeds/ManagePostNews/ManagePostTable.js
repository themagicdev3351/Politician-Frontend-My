import * as React from "react";
import apiService from "../../../ApiSevices/ApiServices";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import { Box, Chip, Paper, Popover, Stack } from "@mui/material";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import { useDispatch } from "react-redux";
import Table from "examples/ReusableTable/Table";
import DeleteModal from "examples/DeleteModal/DeleteModal";
import NodataFound from "examples/NotFoundPage/NodataFound";
import CustomToolbar from "examples/CustomToolbar/CustomToolbar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MDBox from "components/MDBox";
import DeleteConfirmationModal from "assets/theme/components/modal/DeleteConfirmationModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../../examples/CustomError/errorMessages";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: 'none',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '10px',  // Added borderRadius property
// };

export default function ManagePostTable() {
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const location = useLocation();
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get("page")) || 1;
  const limitPerPage = parseInt(query.get("limit")) || 5;
  // const [currentPage, setCurrentPage] = useState(parseInt(params.page) || 1);
  // const [limitPerPage, setLimitPerPage] = useState(parseInt(params.limit) || 5);
  const [posts, setAllPosts] = useState([]);
  // FOr pagination
  const [paginationData, setPaginationData] = useState({
    limitPerPage,
    totalData: 17,
    totalPages: 4,
    currentPage,
  });
  useEffect(() => {
    navigate(`?page=${paginationData.currentPage}&limit=${paginationData.limitPerPage}`, {
      replace: true,
    });
  }, [paginationData.currentPage, paginationData.limitPerPage, navigate]);
  const [active, setActive] = useState({
    id: "",
    status: false,
  });

  const handleViewClick = (params) => {
    navigate(`/ManagePost/viewPost`, { state: { postId: params?.row?._id } });
  };

  // console.log("pagination data", paginationData)
  const getAllPosts = async (e) => {
    try {
      // const res = await apiService.getAllSocialMediaPosts(paginationData);
      const res = await apiService.managePost(paginationData);
      setPaginationData(res?.pageInfo);
      setAllPosts(res?.allInAppMediaPosts);
      console.log("get all post ===>", res);
    } catch (error) {
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
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
    getAllPosts();
  }, [paginationData.currentPage, paginationData.limitPerPage]);
  // To Open View Profile and delete Popover
  const [anchorEl, setAnchorEl] = useState(null);
  // To open delete modal
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    message: "",
    buttonText: "",
    data: {
      postId: null,
    },
  });
  // To change pagination
  const changePage = (currentPage) => {
    setPaginationData({ ...paginationData, currentPage });
    // const queryParams = `?tab=${tab}&page=${currentPage}&limit=${limitPerPage}`;
    // navigate(queryParams, { replace: true });
  };

  // It is using in popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  //  to format the time
  const timeFormater = (date) => {
    const currentTime = dayjs(date);
    const formattedTime = currentTime.format("h:mm A");
    const formatedDate = currentTime.format("DD-MM-YYYY");

    return `${formatedDate} , ${formattedTime}`;
  };
  const changePageSize = (limitPerPage) => {
    setPaginationData({ ...paginationData, currentPage: 1, limitPerPage });
    // const queryParams = `?tab=${tab}&page=${currentPage}&limit=${limitPerPage}`;
    // navigate(queryParams, { replace: true });
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

  const handleClick = (event, _id, status) => {
    setActive({ id: _id, status: status });
    setAnchorEl(event.currentTarget);
  };

  // to close the popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const processData = (data) => {
    return data.map((item, index) => ({
      ...item,
      index:
        index +
        paginationData.currentPage * paginationData.limitPerPage -
        paginationData.limitPerPage +
        1, // Add 1 to start index from 1
    }));
  };
  const rows = processData(posts);

  const columns = [
    {
      field: "index",
      headerName: <MDTypography fontSize="15px">Sr.No</MDTypography>,
      width: 80,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <MDTypography
            fontSize="15px"
            sx={{
              py: 1,
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
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <MDTypography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              py: 1.6,
            }}
          >
            {timeFormater(params.value)}
          </MDTypography>
        );
      },
    },
    {
      field: "numOfLikes",
      headerName: <MDTypography fontSize="15px">Likes</MDTypography>,
      width: 120,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <MDTypography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              py: 1.6,
            }}
          >
            {params.value}
          </MDTypography>
        );
      },
    },
    {
      field: "NumOfComments",
      headerName: <MDTypography fontSize="15px">Comments</MDTypography>,
      align: "center",
      headerAlign: "center",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <MDTypography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              py: 1.6,
            }}
          >
            {params.value}
          </MDTypography>
        );
      },
    },
    {
      field: "Preview",
      headerName: <MDTypography fontSize="15px">Preview</MDTypography>,
      width: 90,
      align: "center",
      sortable: false,
      filterable: false,
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
            onClick={() => handleViewClick(params)}
          >
            View
          </MDTypography>
        );
      },
    },

    {
      field: "isActive",
      headerName: <MDTypography fontSize="15px">Status</MDTypography>,
      width: 150,
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <MDBox width="100%">
              <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                // label="active"
                // color="success"
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
      width: 120,
      sortable: false,
      filterable: false,
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
              onClick={(e) => handleClick(e, params.row._id, params.row.isActive)}
            >
              <MoreVertIcon />
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
                sx={{ width: "130px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: "#6E6B7B",
                    textDecoration: "none",
                    borderRadius: "5px",
                    // width: "138px",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#FF7518",
                      color: "white !important",
                      "& p": {
                        color: "white !important",
                      },
                    },
                  }}
                  onClick={() => {
                    setDialog({
                      open: true,
                      title: `are you sure you want to ${
                        active.status === true ? "deactivate" : "activate"
                      } this`,
                      message: "post ?",
                      buttonText: active.status === true ? "deactivate" : "activate",
                      data: {
                        postId: params.row._id,
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
                    {active.status === true ? "Deactivate" : "Activate"}
                  </MDTypography>
                </Box>
                {/* delete post */}
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: "#6E6B7B",
                    textDecoration: "none",
                    borderRadius: "5px",
                    // width: "138px",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#FF7518",
                      color: "white !important",
                      "& p": {
                        color: "white !important",
                      },
                    },
                  }}
                  onClick={() => {
                    setDialog({
                      open: true,
                      title: `Are you sure want to delele this`,
                      message: "post ?",
                      buttonText: "delete",
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
                    Delete
                  </MDTypography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    color: "#6E6B7B",
                    textDecoration: "none",
                    borderRadius: "5px",
                    // width: "138px",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: "#FF7518",
                      color: "white !important",
                      "& p": {
                        color: "white !important",
                      },
                    },
                  }}
                  onClick={() => navigate(`/editPost/${active.id}`)}
                  // onClick={() => {
                  //   setDialog({
                  //     open: true,
                  //     title: `Are you sure want to delele this`,
                  //     message: "post ?",
                  //     buttonText: "delete",
                  //     data: {
                  //       postId: params.row._id,
                  //     },
                  //   });
                  //   setAnchorEl(null);
                  // }}
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
                    Edit
                  </MDTypography>
                </Box>
              </Stack>
            </Popover>
          </>
        );
      },
    },
  ];
  const DeletePost = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.deletePost(dialog.data.postId);
      // console.log("response", res)
      actionDispatcher(openSnackbar("Post deleted successFully", "success"));
      actionDispatcher(isLoading(false));
      getAllPosts();
    } catch (error) {
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
      actionDispatcher(isLoading(false));
      console.log("error", error);
    }
  };

  const handlePostActiveStatus = async (status) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.changePostStatus({ id: active.id, status: active.status });
      console.log("admin post response", res);
      actionDispatcher(openSnackbar("status updated successFully", "success"));
      actionDispatcher(isLoading(false));
      await getAllPosts();
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

  return (
    <>
      <Stack direction={"column"}>
        <Box mt={2}>
          {/* Table component */}
          {posts?.length == 0 ? (
            <NodataFound />
          ) : (
            <Table
              rows={rows}
              columns={columns}
              CustomToolbar={() => CustomToolbar(paginationData?.limitPerPage, changePageSize)}
              pageCount={paginationData.totalPages}
              pageInfo={paginationData}
              changePage={changePage}
            />
          )}
        </Box>
      </Stack>
      {dialog.open && (
        <>
          <DeleteModal
            open={dialog.open}
            handleClose={handleClose}
            dialog={dialog}
            deleteFunc={
              dialog.buttonText === "activate" || dialog.buttonText === "deactivate"
                ? () => handlePostActiveStatus(dialog.buttonText === "activate")
                : () => DeletePost()
            }
            buttonText={
              dialog.buttonText === "activate"
                ? "Activate"
                : dialog.buttonText === "deactivate"
                ? "Deactivate"
                : "Delete"
            }
            Icon={
              dialog.buttonText === "activate" ? (
                <img src="/protection.png" alt="del" width={50} />
              ) : dialog.buttonText === "deactivate" ? (
                <img src="/shield2.png" alt="del" width={50} />
              ) : (
                ""
              )
            }
          />
        </>
      )}
    </>
  );
}
