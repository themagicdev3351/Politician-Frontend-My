import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Avatar, Box, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import NodataFound from 'examples/NotFoundPage/NodataFound';
import MDTypography from 'components/MDTypography';
import SendIcon from '@mui/icons-material/Send';
import dayjs from 'dayjs';
import MDButton from 'components/MDButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openSnackbar, isLoading } from '../../../redux/action/defaultActions';
import apiService from 'components/ApiSevices/ApiServices';

const ResolvedQuery = ({ data }) => {
    const actionDispatcher = useDispatch();
    const navigate = useNavigate();
    const [showFullText, setShowFullText] = useState(false);
    const [showReplyFullText, setShowReplyFullText] = useState(false);
    const [reply, setReply] = useState({ value: "", id: "" })
    const [textInput, setTextInput] = useState({ open: false, id: "" })
    const timeFormater = (date) => {
        const currentTime = dayjs(date);
        const formattedTime = currentTime.format("h:mm A");
        // const formatedDate = currentTime.format("DD-MM-YYYY");
        const formattedDate = currentTime.format("DD MMM, YYYY");

        return `${formattedDate} , ${formattedTime}`;
    };
    const displayMessage = () => {
        actionDispatcher(openSnackbar("reply can not be none Please fill the input field", "error"));
    }
    const handleSave = async () => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.postReply(reply);
            if (res?.data?.success) {
                setReply({ value: "", id: "" })
                actionDispatcher(isLoading(false));
                setTextInput({ open: false, id: "" })
                actionDispatcher(openSnackbar("Reply has been send successfully", "success"));
            }
        } catch (error) {
            actionDispatcher(isLoading(false));
            actionDispatcher(openSnackbar(error?.response?.data?.error, "error"));

        }
    }
    const changeQueryStatus = async (resolve) => {
        actionDispatcher(isLoading(true));

        try {
            const res = await apiService.changeStatus(resolve);
            console.log("res", res)
            if (res?.data?.success) {
                actionDispatcher(openSnackbar(res?.data?.message, "success"));
                actionDispatcher(isLoading(false));
            }
        } catch (error) {
            actionDispatcher(isLoading(false));
            actionDispatcher(openSnackbar(error?.response?.data?.error, "error"));
        }
    }

    return (
        <>
            <Stack spacing={.8} width={"95%"} sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <List>
                        <ListItem alignItems='start'>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{ width: "50px", height: "50px" }}
                                    src={data.user.profileImg.url}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                sx={{
                                    "& .MuiListItemText-primary": {
                                        fontSize: "14.53px",
                                        fontWeight: "500",
                                    },
                                    "& .MuiListItemText-secondary": {
                                        fontSize: "12.33px",
                                        fontWeight: "400",

                                    },
                                }}
                                primary={`${data.user.userName} ~ `}
                                secondary={data.queryType}
                            />
                            <MDTypography fontSize="14px" sx={{ fontStyle: 'italic', mt: -2.6, ml: .2 }}>{data.user.userType}</MDTypography>
                        </ListItem>
                    </List>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <MDTypography fontSize="14px" fontWeight="medium">Related to</MDTypography>
                    <MDTypography sx={{ ml: .5 }} fontSize="13px" >{data.title}</MDTypography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <MDTypography fontSize="14px" fontWeight="medium">Query </MDTypography>
                    {`${data.query}`.length >= 120 ? <MDTypography fontSize="13px" >
                        {showFullText ? data.query : data.query.slice(0, 150)}...
                        <span onClick={() => setShowFullText(!showFullText)} style={{ cursor: 'pointer', color: 'rgba(106, 106, 106, 1)', fontSize: "17.25px", fontWeight: 400 }}>
                            {showFullText ? ' Read less' : ' Read more'}
                        </span>
                    </MDTypography> : <MDTypography fontSize="13px">{data.query}</MDTypography>}
                    {/* <MDTypography sx={{ ml: .5 }} fontSize="14px">{data.query}</MDTypography> */}
                </Box>
                <Stack>
                    <MDTypography fontSize="16px" fontWeight="medium">Conversations</MDTypography>
                    {data.replies.length === 0 ? <MDTypography sx={{ ml: .5 }} fontSize="14px">No Conversation</MDTypography> : <Stack spacing={.5} ml={.5}>
                        {data.replies.map((adminReply, id) => {
                            return <Box sx={{ display: "flex" }} key={adminReply._id}>
                                <MDTypography fontSize="14px" fontWeight="medium">{adminReply.from === "admin" ? "You" : adminReply.from}  </MDTypography>
                                {`${adminReply.reply}`.length >= 120 ? <MDTypography fontSize="13px" sx={{ml:1}} >
                                    {showReplyFullText ? adminReply.reply : adminReply.reply.slice(0, 150)}...
                                    <span onClick={() => setShowReplyFullText(!showReplyFullText)} style={{ cursor: 'pointer', color: 'rgba(106, 106, 106, 1)', fontSize: "17.25px", fontWeight: 400 }}>
                                        {showReplyFullText ? ' Read less' : ' Read more'}
                                    </span>
                                </MDTypography> : <MDTypography sx={{ ml: 1.5 }} fontSize="13px" fontWeight="regular">{`${adminReply.reply}`}</MDTypography>}
                                {/* <MDTypography sx={{ ml: .5 }} fontSize="14px">{data.query}</MDTypography> */}

                            </Box>

                        })}
                    </Stack>}


                </Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <MDTypography fontSize="13px">Query asked at : </MDTypography>
                        <MDTypography fontSize="13px" sx={{ ml: .5 }}> {timeFormater(data.createdAt)}</MDTypography>
                        {data.replies.length === 0 ? <MDTypography fontSize="17px" color="primary" fontWeight="regular" sx={{ ml: 1.5 }}>Not Replied</MDTypography> : <MDTypography fontSize="17px" fontWeight="regular" sx={{ ml: 1.5, color: "green" }}>Replied</MDTypography>}

                    </Box>
                </Box>
            </Stack>

        </>
    )
}
ResolvedQuery.propTypes = {
    data: PropTypes.array,
};
export default ResolvedQuery