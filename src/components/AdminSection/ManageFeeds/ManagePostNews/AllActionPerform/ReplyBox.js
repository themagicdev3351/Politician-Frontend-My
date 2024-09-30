import { Avatar, Box, Collapse, List, ListItemButton, Typography, Stack, ListItemText } from '@mui/material'
import MDTypography from 'components/MDTypography'
import React, { useState } from 'react'
import DeleteIcon from '../../../../../assets/images/deleteIcon.png'
import PropTypes from 'prop-types';

const ReplyBox = ({ item, deleteReply, getTimeDifference }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <ListItemText sx={{ marginLeft: "2.5rem", cursor: "pointer" }} secondary={
                <Typography component="span" sx={{ fontWeight: 400, color: "#FF9933", fontSize: ".8rem" }} >
                    {open && item?.replies.length > 0 ? "hide Reply" : item?.replies.length === 0 ? "" : `${item?.replies.length} Replies`}
                </Typography>
            } onClick={handleClick} />
            <Collapse sx={{ ml: 2 }} in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item?.replies.map((reply, replyIndex) => (
                        <Box key={reply._id}>
                            <ListItemButton ListItemButton sx={{ display: "flex", justifyContent: "space-between" }} >
                                <Box sx={{ display: "flex", }}>
                                    {reply?.user === null ? <Avatar
                                        sx={{
                                            width: "30px",
                                            height: "30px"
                                        }}
                                    /> : <Avatar
                                        sx={{
                                            width: "25px",
                                            height: "25px"
                                        }}
                                        src={reply?.user?.profileImg?.url}
                                    />}
                                    <MDTypography textTransform="capitalize" sx={{ ml: 1.5 }} fontSize="14px">{reply?.user == null ? "No user Name" : reply?.user?.userName}</MDTypography>

                                </Box>

                                <Box display={'flex'} alignItems={'center'}
                                    onClick={() => deleteReply(item._id, reply._id)}
                                >
                                    <img
                                        style={{ filter: 'sepia(1) hue-rotate(180deg) saturate(500%) brightness(0.5)' }}
                                        src={DeleteIcon}
                                    />
                                </Box>
                            </ListItemButton >
                            <Stack ml={6}>
                                <Typography sx={{
                                    width: "232px",
                                    textWrap: "wrap",
                                    fontSize: "15px"
                                }} component="span"   >
                                    {reply?.reply}
                                </Typography>
                                <Typography fontWeight="regular" fontSize="12px">
                                    {getTimeDifference(reply?.createdAt)}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </List>
            </Collapse>
        </>

    )
}
ReplyBox.propTypes = {
    item: PropTypes.any,
    deleteReply: PropTypes.func,
    getTimeDifference: PropTypes.func,
};
export default ReplyBox