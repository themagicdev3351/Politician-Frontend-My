import React from 'react'
import PropTypes from "prop-types";
import ModalComponent from 'examples/ModalComponent/ModalComponent';
import MDTypography from 'components/MDTypography';
import { Box, Stack, Typography } from '@mui/material';
import MDButton from 'components/MDButton';
import { useDispatch } from 'react-redux';
import { openSnackbar, isLoading } from '../../../redux/action/defaultActions';
import apiService from 'components/ApiSevices/ApiServices';

const ConfirmationApproval = ({ open, setAutoApprove, handleClose, autoApprove, partWorkerData }) => {
    console.log("autoApprove", autoApprove)
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        console.log("Handle submit")
        try {
            const res = await apiService.approvePartyWorker(autoApprove);
            if (res?.data.success) {
                partWorkerData()
                handleClose()
                setAutoApprove({ id: "", status: null })
                dispatch(isLoading(false))
                dispatch(openSnackbar("Automatic permission status updated successfully", "success"));

            }
        } catch (error) {
            dispatch(openSnackbar(error?.response?.data?.message, "error"));
            dispatch(isLoading(false));
        }
    }
    return (
        <ModalComponent open={open} handleClose={handleClose}>
            <Stack spacing={1.5}>
                <Typography sx={{
                    textWrap: "wrap",
                    // py: 1,
                    fontSize: "20px",
                    width: "320px",
                    // py: 1,
                    // overflow: "hidden", // Hides overflow content
                    // whiteSpace: "nowrap", // Prevents text from wrapping
                    // textOverflow: "ellipsis",
                }} >{`Are you sure you want to ${autoApprove.status ? "revoke the permission" : "provide auto approval for all future posts"} ?`}</Typography>
                <Box sx={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                    <MDButton color={"primary"}
                        onClick={handleSubmit}
                        variant={"contained"}
                        size={"small"}>{autoApprove.status ? "Revoke" : "Approve"}</MDButton>
                    <MDButton color={"warning"}
                        variant={"outlined"}
                        size={"small"} onClick={handleClose}>Cancel</MDButton>
                </Box>
            </Stack>
        </ModalComponent>
    )
}
ConfirmationApproval.propTypes = {

    open: PropTypes.bool,
    setAutoApprove: PropTypes.func,
    handleClose: PropTypes.func,
    partWorkerData: PropTypes.func,
    autoApprove: PropTypes.object,
};
export default ConfirmationApproval