import ModalComponent from 'examples/ModalComponent/ModalComponent'
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { Box, Stack, TextField } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

const SetMessage = ({ open, handleClose, status, deleteFunc }) => {
    const [formData, setFormData] = useState({
        meetUrl: "",
        comment: ""
    })
    const [error, setError] = useState('')
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;


    useEffect(() => {
        if (formData.meetUrl === "") {
            setError('');

        } else if (!urlRegex.test(formData.meetUrl)) {
            setError('URL pattern should be like this https://demo.something.com');


        }
        // if (!urlRegex.test(formData.meetUrl)) {
        //     setError('URL Should be start with https//');
        // }
    }, [formData.meetUrl])
    return (
        <ModalComponent open={open} handleClose={handleClose}>

            {status.value === "approved" && <Stack component={'form'} spacing={1.5} width={350}>
                <Box>
                    <MDTypography variant="h6">Meet link/Venu</MDTypography>

                    <TextField
                        fullWidth
                        placeholder='Enter Url Link'
                        id='meetUrl'
                        variant="standard"
                        name="meetUrl"
                        value={formData.meetUrl}
                        onChange={(e) => setFormData({ ...formData, meetUrl: e.target.value })}

                    />
                    <span style={{ fontSize: "10px", color: "red" }}>{error}</span>
                </Box>
                <Box>
                    <MDTypography variant="h6">Comment<span style={{ color: "red" }}>*</span></MDTypography>

                    <TextField
                        fullWidth
                        placeholder='Write your comment here'
                        id='meetUrl'
                        variant="standard"
                        name="comment"
                        // required
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}

                    />
                </Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MDButton variant="contained"
                        color="secondary"
                        // disabled={formData.comment === ""}
                        onClick={() => deleteFunc(formData)}
                        size="small"
                        disabled={error !== "" ? true : false}
                        sx={{
                            mt: 1, "&:hover": {
                                color: "secondary",
                                variant: "contained"
                            }
                        }}
                    >
                        {status.value === "approved" && "Approve"}
                    </MDButton>
                </Box>
            </Stack>}
            {status.value === "rejected" && <Stack component={'form'} spacing={1} width={350}>
                <Box>
                    <MDTypography variant="h6">Comment<span style={{ color: "red" }}>*</span></MDTypography>
                    <TextField
                        fullWidth
                        placeholder='Write your comment here'
                        id='comment'
                        variant="standard"
                        name="comment"
                        required
                        // value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}

                    />
                </Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <MDButton variant="contained"
                        color="secondary"
                        onClick={() => deleteFunc(formData)}
                        size="small"
                        sx={{
                            mt: 1, "&:hover": {
                                color: "secondary",
                                variant: "contained"

                            }
                        }}
                    >
                        {status.value === "rejected" && "Reject"}
                    </MDButton>
                </Box>

            </Stack>}
        </ModalComponent>
    )
}
SetMessage.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    status: PropTypes.object,
    handleClose: PropTypes.func,
    deleteFunc: PropTypes.func,
};
export default SetMessage