import { Avatar, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from '@mui/material'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import React, { useEffect, useState } from 'react'
import demo from "../../../../assets/images/pdf.svg"
import MDButton from 'components/MDButton'
import apiService from 'components/ApiSevices/ApiServices'
import { useDispatch } from 'react-redux'
import { isLoading, openSnackbar } from '../../../../redux/action/defaultActions'
import DownloadIcon from '@mui/icons-material/Download';
import DisplaySelectedImagesGrid from 'components/AdminSection/ManageFeeds/CreatePostsNews/DisplaySelectedImagesGrid'

const VerifyMentor = () => {
    const actionDispatcher = useDispatch();
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [openItemId, setOpenItemId] = useState(null);

    const handleClickCollapse = (id) => {
        setOpenItemId(openItemId === id ? null : id);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const GetVerifyMentor = async () => {
        try {
            const res = await apiService.AllVerifyMentor();
            console.log("res VerifyMentorrrr====>", res)
            setData(res?.pendingVerificationRequests)

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
    }
    const handleVerifyMentor = async (status, verificationId) => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.VerifyMentor(status, verificationId,);
            // console.log("res VerifyMentorrrr====>")
            actionDispatcher(openSnackbar(res?.message, "success"));
            actionDispatcher(isLoading(false));
            GetVerifyMentor()
            // setData(res?.verificationRequests)
        } catch (error) {
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
            actionDispatcher(isLoading(false));
            console.log("error", error);
        }
    }


    const handleDownload = (url) => {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Use the file name from the URL
        link.click();
    };

    useEffect(() => {

        GetVerifyMentor()
    }, [])

    const renderMarksheet = (marksheetname, marksheet) => (
        <List component="div" disablePadding key={marksheet} >
            <ListItemButton onClick={() => handleDownload(marksheet?.url)}>
                <ListItemIcon>
                    <Avatar sx={{ width: 40, height: 40, objectFit: 'cover' }} src={demo} alt={marksheet?.originalname} />
                </ListItemIcon>
                <ListItemText
                    secondary={
                        <MDTypography component="span" sx={{ fontWeight: 400, fontSize: "1rem", }}>
                            {marksheetname}
                        </MDTypography>
                    }
                    sx={{ fontWeight: 500, fontSize: "1rem", minWidth: "50rem" }}
                />
                <ListItemText
                    secondary={
                        <MDTypography component="span" sx={{ fontWeight: 400, fontSize: "1.5rem" }}>
                            <DownloadIcon />
                        </MDTypography>
                    }
                    sx={{ fontWeight: 500, fontSize: "1rem" }}
                />

            </ListItemButton>
        </List>
    );

    return (

        <MDBox sx={{ marginRight: "1rem", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {(data && data.length > 0) ? (
                <MDBox sx={{ width: "60%", display: "flex", flexDirection: "column", justifyContent: "center", }} >
                    {data.map((item, index) => (
                        <MDBox key={index} my={2} sx={{ borderBottom: '0.5px solid #d9d9d9' }}>
                            <ListItem
                                secondaryAction={
                                    <Stack direction={"row"} gap={2}>
                                        <MDButton
                                            color={"primary"}
                                            variant={"contained"}
                                            size={"small"}
                                            onClick={() => handleVerifyMentor("approved", item?._id)}
                                        >
                                            Accept
                                        </MDButton>
                                        <MDButton
                                            variant={"contained"}
                                            size={"small"}
                                            onClick={() => handleVerifyMentor("rejected", item?._id)}
                                        >
                                            Reject
                                        </MDButton>
                                    </Stack>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={item?.mentor?.profileImg?.url} alt={'Avatar'} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <MDBox>
                                            <MDTypography variant="body1" sx={{ fontSize: "1rem", fontWeight: "medium" }} color="secondary">
                                                {item?.mentor?.userName}
                                            </MDTypography>
                                            <MDTypography sx={{ fontSize: "0.8rem" }} variant="body2">{item?.highestQualification}</MDTypography>
                                        </MDBox>
                                    }
                                    secondary={openItemId === item?._id ? "hide Document" : `Uploaded Document`}
                                    onClick={() => handleClickCollapse(item?._id)}
                                />
                            </ListItem>
                            <Collapse in={openItemId === item?._id} timeout="auto" unmountOnExit my={2} sx={{ marginTop: "1rem" }}>
                                {/* <Paper elevation={1} sx={{ borderRadius: "1rem", backgroundColor: "#e3e3e3" }}> */}
                                {renderMarksheet("marksheet10th", item?.marksheet10th)}
                                {renderMarksheet("marksheet12th", item?.marksheet12th)}
                                {renderMarksheet("marksheetGraduation", item?.marksheetGraduation)}
                                {renderMarksheet("marksheetPG", item?.marksheetPG)}
                                {/* </Paper> */}
                            </Collapse>
                        </MDBox>
                    ))}
                </MDBox>
            ) : (
                <MDBox sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                    <MDTypography>
                        No Mentor Verification Found
                    </MDTypography>
                </MDBox>
            )}

        </MDBox >
    );
};

export default VerifyMentor
