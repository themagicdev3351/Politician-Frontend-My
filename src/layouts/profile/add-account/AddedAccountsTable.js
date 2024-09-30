import {
    Box,
    Stack,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { isLoading, openSnackbar } from '../../../redux/action/defaultActions';
import NodataFound from "examples/NotFoundPage/NodataFound";
import { useEffect, useState } from "react";
import apiService from "components/ApiSevices/ApiServices";
import MDTypography from "components/MDTypography";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import AccountTable from "./AccountTable";
import DeleteModal from "examples/DeleteModal/DeleteModal";

const AddedAccountsTable = () => {
    const navigate = useNavigate();
    const actionDispatcher = useDispatch();
    const [posts, setAllPosts] = useState([])
    // To Open View Profile and delete Popover
    const [anchorEl, setAnchorEl] = useState(
        null
    );
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
    // It is using in popover
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleClose = () => {
        setAnchorEl(null);

        setDialog({
            open: false,
            title: "",
            message: "",
            buttonText: "",
        });
    };
    const SocialMediaAccounts = async (e) => {
        try {
            const res = await apiService.getAllSocialMediaAccounts();
            setAllPosts(res?.data.allAccounts)
            // console.log("get all social media posts", res)
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error', error.message);
            }
        }
    };
    useEffect(() => {
        SocialMediaAccounts()

    }, []);
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
            headerName: <MDTypography fontSize="15px">Sr.No</MDTypography>,
            width: 80,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <MDTypography fontSize="15px" sx={{
                        py: 1,

                    }}>
                        {params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "userName",
            headerName: <MDTypography fontSize="15px">User Name</MDTypography>,
            width: 200,
            // Height:"auto",
            // valueGetter: (params) => params.value,
            renderCell: (params) => {
                // console.log("business private post table", params)
                return (
                    <>
                        <MDTypography sx={{
                            // ml: .5,
                            fontSize: "15px",
                            width: "230px",
                            textWrap: "wrap",
                            py: 1,
                            // height: 25
                        }}>@{params.value}</MDTypography>
                    </>
                );
            },
        },
        {
            field: "platform",
            headerName: <MDTypography fontSize="15px">Platform</MDTypography>,
            width: 100,
            renderCell: (params) => {
                return (
                    <MDTypography sx={{
                        fontSize: "14px",
                        fontWeight: "400",
                        py: 1.6

                    }}>
                        {params.value}
                    </MDTypography>
                );
            },
        },
        {
            field: "profileUrl",
            headerName: <MDTypography fontSize="15px">ProfileUrl</MDTypography>,
            width: 500,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return <MDTypography sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    py: 1.6
                }}>{params.value}</MDTypography>;
            },
        },
        {
            field: "Action",
            headerName: <MDTypography fontSize="15px">Action</MDTypography>,
            width: 120,
            align: "center",
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <>
                        <MDTypography
                            sx={{
                                fontSize: "20.33px",
                                fontWeight: "400",
                                cursor: "pointer",
                                py: 1.6

                            }}
                            onClick={() => {
                                setDialog({
                                    open: true,
                                    title: ``,
                                    message: "account",
                                    buttonText: "",
                                    data: {
                                        postId: params.row._id,
                                    },
                                });
                                setAnchorEl(null);
                            }}>
                            <DeleteOutlineIcon />
                        </MDTypography>

                    </>
                );
            },
        },
    ];
    const DeleteAccount = async () => {
        // actionDispatcher(isLoading(true));
        try {
            const res = await apiService.deleteSocialMediaAccount(dialog.data.postId)
            // console.log("response", res)
            actionDispatcher(openSnackbar("Social Media Account deleted SuccessFully", "success"));
            actionDispatcher(isLoading(false));
            SocialMediaAccounts()
        } catch (error) {
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
            // actionDispatcher(isLoading(false));
            console.log("error", error);
        }
    }
    return (
        <>
            <Stack direction={"column"}>
                <Box mt={2}>
                    {/* Table component */}
                    {posts.length == 0 ? (
                        <NodataFound />
                    ) : (
                        <AccountTable
                            rows={rows}
                            columns={columns}
                        // CustomToolbar={() =>
                        //     CustomToolbar(paginationData.limitPerPage, changePageSize)
                        // }
                        // pageCount={paginationData.totalPages}
                        // pageInfo={paginationData}
                        // changePage={changePage}
                        />
                    )}
                </Box>
            </Stack>
            {
                dialog.open && <DeleteModal
                    open={dialog.open}
                    handleClose={handleClose}
                    dialog={dialog}
                    deleteFunc={() => DeleteAccount()}
                />
            }
        </>

    );
}

export default AddedAccountsTable