import React, { useEffect, useState } from 'react'
import { Avatar, Box, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { isLoading } from '../../../redux/action/defaultActions';
import apiService from 'components/ApiSevices/ApiServices';
import { Rating } from '@mui/material';
import NodataFound from 'examples/NotFoundPage/NodataFound';
import dayjs from 'dayjs';
import MDTypography from 'components/MDTypography';
import StarIcon from '@mui/icons-material/Star';
import './styles.css';

const FeedBack = ({ filter }) => {
    const [feedBacks, setFeedBacks] = useState([]);
    const actionDispatcher = useDispatch();
    console.log("filter", filter)
    const AllfeedBacks = async () => {
        actionDispatcher(isLoading(true));
        try {
            const res = await apiService.getAllFeedbacks();
            console.log("res", res)
            if (res?.data.success) {
                actionDispatcher(isLoading(false));
                setFeedBacks(res?.data.allFeedbacks)
            }
        } catch (error) {
            actionDispatcher(isLoading(false));

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
    useEffect(() => {
        AllfeedBacks();
    }, [])
    const timeFormater = (date) => {
        const currentTime = dayjs(date);
        const formattedTime = currentTime.format("h:mm A");
        // const formatedDate = currentTime.format("DD-MM-YYYY");
        const formattedDate = currentTime.format("DD MMM, YYYY");

        return `${formattedDate} , ${formattedTime}`;
    };
    const GradientStarIcon = (props) => (
        <StarIcon
            {...props}
            className="gradient"
            style={{
                fontSize: 'inherit',
            }}
        />
    );
    return (
        <>
            <Grid container px={1} rowGap={1} sx={{ height: 500, overflowY: 'auto' }}>
                {feedBacks.length === 0 ? <NodataFound /> : filter === "oldest" ? feedBacks?.slice().reverse().map((data, index) => {
                    return <Grid key={data._id} component={Paper} item md={12} sm={6} p={1.5} sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px", }}>
                        <Stack spacing={.7} width={"95%"}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <List>
                                    <ListItem alignItems='start'>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{ width: "40px", height: "40px" }}
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
                                        // secondary={data.queryType}
                                        />
                                        <MDTypography fontSize="14px" sx={{ fontStyle: 'italic', ml: .2 }}>{data.user.userType}</MDTypography>
                                    </ListItem>
                                </List>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <MDTypography fontSize="13px" fontWeight="regular">Feedback given on</MDTypography>
                                    <MDTypography fontSize="13px" sx={{ ml: .5 }} fontWeight="regular">{timeFormater(data.createdAt)}</MDTypography>
                                </Box>

                            </Box>
                            <Box>
                                <Rating
                                    style={{
                                        fontSize: '40px',
                                        background: 'none',
                                        backgroundClip: 'text',
                                        color: `linear-gradient(to right, #2ECC71, #BDC3C7)`
                                    }}
                                    size="large"
                                    key={index}
                                    name="read-only"
                                    value={data.rating}
                                    readOnly
                                    precision={0.5}
                                />
                            </Box>
                            <Box px={1} width={'95%'}>
                                <MDTypography fontSize="15px" fontWeight="regular">{data.comment}</MDTypography>
                            </Box>
                        </Stack>
                    </Grid>
                }) :
                    feedBacks?.map((data, index) => {
                        return <Grid key={data._id} component={Paper} item md={12} sm={6} p={1.5} sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px", }}>
                            <Stack spacing={.7} width={"95%"}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <List>
                                        <ListItem alignItems='start'>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{ width: "40px", height: "40px" }}
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
                                            // secondary={data.queryType}
                                            />
                                            <MDTypography fontSize="14px" sx={{ fontStyle: 'italic', ml: .2 }}>{data.user.userType}</MDTypography>
                                        </ListItem>
                                    </List>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <MDTypography fontSize="13px" fontWeight="regular">Feedback given on</MDTypography>
                                        <MDTypography fontSize="13px" sx={{ ml: .5 }} fontWeight="regular">{timeFormater(data.createdAt)}</MDTypography>
                                    </Box>

                                </Box>
                                <Box>
                                    <Rating
                                        style={{
                                            fontSize: '40px',
                                            background: 'none',
                                            backgroundClip: 'text',
                                            color: `linear-gradient(to right, #2ECC71, #BDC3C7)`
                                        }}
                                        size="large"
                                        key={index}
                                        name="read-only"
                                        value={data.rating}
                                        readOnly
                                        precision={0.5}
                                    />
                                </Box>
                                <Box px={1} width={'95%'}>
                                    <MDTypography fontSize="15px" fontWeight="regular">{data.comment}</MDTypography>
                                </Box>
                            </Stack>
                        </Grid>
                    })

                }
            </Grid >

        </>
    )
}
FeedBack.propTypes = {
    filter: PropTypes.string,
};
export default FeedBack