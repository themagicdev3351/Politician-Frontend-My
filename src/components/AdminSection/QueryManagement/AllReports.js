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

const AllReports = ({ filter }) => {
  const [reports, setreports] = useState([]);
  const actionDispatcher = useDispatch();
  console.log("filter", filter)

  const Allreports = async () => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.getAllreports();
      if (res?.data.success) {
        actionDispatcher(isLoading(false));
        setreports(res?.data.allReports)
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
    Allreports();
  }, [])
  const timeFormater = (date) => {
    const currentTime = dayjs(date);
    const formattedTime = currentTime.format("h:mm A");
    // const formatedDate = currentTime.format("DD-MM-YYYY");
    const formattedDate = currentTime.format("DD MMM, YYYY");

    return `${formattedDate} , ${formattedTime}`;
  };

  return (
    <Grid container px={1} rowGap={1} sx={{ height: 500, overflowY: 'auto' }}>
      {reports.length === 0 ? <NodataFound /> : filter === "oldest" ? reports?.slice().reverse().map((data, index) => {
        return (
          <Grid
            key={data._id}
            component={Paper}
            item
            md={12}
            sm={6}
            p={2}
            sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px" }}
          >
            <Stack spacing={0.7} width={"95%"}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <List>
                  <ListItem alignItems="start">
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: "50px", height: "50px" }}
                        src={data.mentor.profileImg.url}
                      />
                    </ListItemAvatar>
                  </ListItem>
                </List>
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <MDTypography fontSize="18px" fontWeight="medium">
                    {`${data.mentor.userName} : ${data.reason}`}
                  </MDTypography>
                  <MDTypography fontSize="15px" fontWeight="regular">
                    {`Additional Comments : ${data.additionalComment === undefined
                      ? "No Additional comments"
                      : data.additionalComment
                      }`}
                  </MDTypography>
                  <MDTypography fontSize="13px">
                    {`Reported By : ${data.reportedBy.userName}`}
                  </MDTypography>
                  <MDTypography fontSize="13px" fontWeight="regular">
                    {timeFormater(data.createdAt)}
                  </MDTypography>
                </Box>
              </Box>
            </Stack>
          </Grid>
        )
      }) :
        reports?.map((data, index) => {
          return <Grid key={data._id} component={Paper} item md={12} sm={6} p={2} sx={{ border: "1px solid rgba(200, 200, 200, 1)", borderRadius: "5px", }}>
            <Stack spacing={.7} width={"95%"}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <List>
                  <ListItem alignItems='start'>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: "50px", height: "50px" }}
                        src={data.mentor.profileImg.url}
                      />
                    </ListItemAvatar>

                  </ListItem>
                </List>
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  <MDTypography fontSize="18px" fontWeight="medium">{`${data.mentor.userName} : ${data.reason}`}</MDTypography>
                  <MDTypography fontSize="15px" fontWeight="regular">{`Additional Comments : ${data.additionalComment == undefined ? "No Additional comments" : data.additionalComment}`}</MDTypography>
                  <MDTypography fontSize="13px" >{`Reported By : ${data.reportedBy.userName}`}</MDTypography>
                  <MDTypography fontSize="13px" fontWeight="regular">{timeFormater(data.createdAt)}</MDTypography>
                </Box>

              </Box>

            </Stack>
          </Grid>
        })

      }
    </Grid >
  )
}
AllReports.propTypes = {
  filter: PropTypes.string,
};
export default AllReports