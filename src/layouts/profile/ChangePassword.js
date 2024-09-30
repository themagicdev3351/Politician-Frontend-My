import ModalComponent from 'examples/ModalComponent/ModalComponent'
import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Box, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import apiService from 'components/ApiSevices/ApiServices';
import { openSnackbar } from "../../redux/action/defaultActions";
import { useDispatch } from 'react-redux';
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
const ChangePassword = ({ open, handleCloseModal }) => {
    const dispatch = useDispatch();
    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordCon, setShowPasswordCon] = useState(false);

    const [formData, setFormData] = useState({
        oldPassword: "",
        NewPassword: "",
        ConfirmPassword: ""
    })
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await apiService.UpdatePassword(formData);
            if (res.success) {
                dispatch(openSnackbar(`password updated Successfully`, "success"));
                handleCloseModal()
            }

        } catch (error) {
            console.log("error", error)
            dispatch(openSnackbar(error?.response?.data?.message, "error"));


        }
    }
    return (
        <ModalComponent open={open} handleClose={handleCloseModal}>
            <Box width={350}>
                <Grid container spacing={2} component={'form'} onSubmit={handleSave}>
                    <Grid item xs={12}>
                        <MDTypography variant="h6">Old Password</MDTypography>
                        <Box display="flex" alignItems="center" position={'relative'}>
                            <TextField
                                type={showPasswordOld ? "text" : "password"}
                                variant="standard"
                                name="password"
                                placeholder=". . . . . . . . . . ."
                                fullWidth
                                required
                                value={formData.oldPassword}
                                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                // browser default hide unhide feature is working
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPasswordOld(!showPasswordOld)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                aria-label="toggle password visibility"
                                            >
                                                {showPasswordOld ? (
                                                    <RemoveRedEyeRoundedIcon />
                                                ) : (
                                                    <VisibilityOffRoundedIcon />

                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <TextField
                            fullWidth
                            variant="standard"
                            value={formData.oldPassword}
                            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                        /> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <MDTypography variant="h6">New Password</MDTypography>
                        <Box display="flex" alignItems="center" position={'relative'}>
                            <TextField
                                type={showPasswordNew ? "text" : "password"}
                                variant="standard"
                                name="password"
                                placeholder=". . . . . . . . . . ."
                                fullWidth
                                required
                                value={formData.NewPassword}
                                onChange={(e) => setFormData({ ...formData, NewPassword: e.target.value })}

                                // browser default hide unhide feature is working
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPasswordNew(!showPasswordNew)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                aria-label="toggle password visibility"
                                            >
                                                {showPasswordNew ? (
                                                    <RemoveRedEyeRoundedIcon />
                                                ) : (
                                                    <VisibilityOffRoundedIcon />

                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <TextField
                            fullWidth
                            variant="standard"
                            value={formData.NewPassword}
                            onChange={(e) => setFormData({ ...formData, NewPassword: e.target.value })}
                        /> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <MDTypography variant="h6">Confirm Password</MDTypography>

                        <Box display="flex" alignItems="center" position={'relative'}>
                            <TextField
                                type={showPasswordCon ? "text" : "password"}
                                variant="standard"
                                name="password"
                                placeholder=". . . . . . . . . . ."
                                fullWidth
                                required
                                value={formData.ConfirmPassword}
                                onChange={(e) => setFormData({ ...formData, ConfirmPassword: e.target.value })}

                                // browser default hide unhide feature is working
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPasswordCon(!showPasswordCon)}
                                                onMouseDown={(e) => e.preventDefault()}
                                                aria-label="toggle password visibility"
                                            >
                                                {showPasswordCon ? (
                                                    <RemoveRedEyeRoundedIcon />
                                                ) : (
                                                    <VisibilityOffRoundedIcon />

                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {/* <TextField
                            fullWidth
                            variant="standard"
                            value={formData.ConfirmPassword}
                            onChange={(e) => setFormData({ ...formData, ConfirmPassword: e.target.value })}
                        /> */}
                        </Box>
                        {formData.ConfirmPassword !== formData.NewPassword && <span style={{ fontSize: "12px", color: "red" }}>confirm password is not same**</span>}
                    </Grid>
                    <Grid item xs={12}>
                        <MDButton
                            variant="gradient"
                            color="primary"
                            type="submit"
                            // onClick={handleSave}
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            Reset Password
                        </MDButton>
                    </Grid>
                </Grid>
            </Box>

        </ModalComponent >
    )
}
ChangePassword.propTypes = {
    open: PropTypes.bool,
    handleCloseModal: PropTypes.func,
};
export default ChangePassword