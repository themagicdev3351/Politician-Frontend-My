import { Box, Button, FormControl, Grid, MenuItem, Select, TextField } from '@mui/material'
import { openSnackbar } from '../../../redux/action/defaultActions';
import apiService from 'components/ApiSevices/ApiServices'
import MDButton from 'components/MDButton'
import MDTypography from 'components/MDTypography'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddedAccountsTable from './AddedAccountsTable';

const AddAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        platform: "",
        userName: "",
        profileUrl: ""
    });

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await apiService.addSocialMediaAccount(values);
            if (res.success) {
                setValues({
                    platform: "",
                    userName: "",
                    profileUrl: ""
                })
                dispatch(openSnackbar(`Account created Successfully`, "success"));
            }
        } catch (error) {
            dispatch(openSnackbar(error?.message === "Request failed with status code 500" ? "Network is Not working" : error?.response?.data?.message, "error"));
        }
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", p: 1 }}>
                <MDTypography fontSize="18px">Add Social Media Account</MDTypography>
                <MDTypography fontSize="18px" onClick={() => navigate('/profile')} sx={{ cursor: "pointer" }}>Back</MDTypography>

            </Box>
            <Box display="flex" component={'form'} onSubmit={handleSave} flexDirection="column" alignItems="center" px={20}>

                <Grid container spacing={2} mt={2} px={5}>
                    <Grid item xs={12} display={'flex'}>
                        <MDTypography variant="h6">Platform</MDTypography>
                        <Box display="flex" alignItems="center" width={'85%'} >
                            <FormControl fullWidth>
                                {/* <InputLabel id="category-select-label">Select category</InputLabel> */}
                                <Select
                                    sx={{ py: .3, ml: 12 }}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    value={values.platform === "" ? "placeholder" : values.platform}
                                    name='platform'
                                    id='platform'
                                    onChange={(e) => setValues({ ...values, platform: e.target.value })}
                                >
                                    <MenuItem value={'placeholder'}>--Select-platform--</MenuItem>
                                    {["facebook", "twitter", "youtube"].map((account, id) => (
                                        <MenuItem key={id} value={account}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>

                                                {account}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                    </Grid>
                    {values.platform && !['facebook', 'twitter', 'instagram', 'youtube'].includes(values.platform) ? (
                        <MDTypography sx={{ fontSize: "12px", color: "red", width: "85%", display: "block", ml: 23 }}>Platform Should be facebook, twitter, instagram or youtube</MDTypography>
                    ) : ""}
                    <Grid item xs={12} display={'flex'}>
                        <MDTypography variant="h6">User Name</MDTypography>
                        <Box display="flex" alignItems="center" width={'82%'}>
                            <TextField
                                fullWidth
                                name='userName'
                                id='userName'
                                required
                                sx={{ ml: 10 }}
                                placeholder=' Add username of your profile'
                                value={values.userName}
                                onChange={(e) => setValues({ ...values, userName: e.target.value })}
                                variant="standard"
                            />

                        </Box>
                    </Grid>
                    <Grid item xs={12} display={'flex'}>
                        <MDTypography variant="h6">Profile Url</MDTypography>
                        <Box display="flex" alignItems="center" width={'83%'}>
                            <TextField
                                fullWidth
                                name='profileUrl'
                                id='profileUrl'
                                required
                                sx={{ ml: 11 }}
                                placeholder=' Paste URL of your profile here'
                                value={values.profileUrl}
                                onChange={(e) => setValues({ ...values, profileUrl: e.target.value })}
                                variant="standard"
                            />

                        </Box>
                    </Grid>

                    <Grid item xs={12} mx={20}>
                        <Box width={'100%'}>
                            <MDButton
                                type="submit"
                                variant="gradient"
                                color="primary"
                                fullWidth
                                sx={{ mt: 1 }}
                            >
                                Save
                            </MDButton>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box mt={3} p={1}>
                <MDTypography>Added Accounts</MDTypography>
            </Box>
            <AddedAccountsTable />
        </DashboardLayout>
    )
}

export default AddAccount