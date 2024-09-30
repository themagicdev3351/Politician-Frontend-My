import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import DeleteIconNew from "../../assets/images/GroupDelete.png";
import changeIcon from '../../assets/images/gg_profile.svg'
const ChangleProfileModal = ({ open, handleClose, dialog, deleteFunc, Icon }) => {
    return (
        <>
            <ModalComponent open={open} handleClose={handleClose} type={"delete"}>
                <Stack
                    spacing={1}
                    sx={{
                        // bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* <img src={DeleteIconNew} /> */}
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Stack mt={1} mb={1} direction={"row"} alignItems={"center"} justifyContent={"center"}>
                            {Icon ? (
                                Icon
                            ) : (
                                <>
                                    {/* <img
                                        alt="edit"
                                        style={{ height: "40px", width: "40px" }}
                                        src={changeIcon}
                                    /> */}
                                    <img
                                        alt="edit"
                                        style={{ height: "35px", width: "35px" }}
                                        src="/editIcon.svg"
                                    />
                                </>
                            )}
                        </Stack>
                    </Box>
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: "17px",
                        }}
                    >
                        {dialog.buttonText === ""
                            ? `Are you sure you want to delete this ${dialog?.title} ${dialog?.message} ?`
                            : `${dialog?.title} ${dialog?.message}`}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            bgcolor: "background.paper",
                            my: 2,
                        }}
                    >
                        <MDButton
                            variant="contained"
                            color="secondary"
                            size="medium"
                            onClick={() => {
                                deleteFunc();
                                handleClose();
                            }}
                        >
                            {dialog.buttonText ? dialog.buttonText : "Delete"}
                            {/* delete */}
                        </MDButton>
                        <MDButton variant="outlined" color="secondary" size="medium" onClick={handleClose}>
                            Cancel
                        </MDButton>
                    </Box>
                </Stack>
            </ModalComponent>
        </>
    );
}
ChangleProfileModal.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    dialog: PropTypes.object,
    handleClose: PropTypes.func,
    deleteFunc: PropTypes.func,
    Icon: PropTypes.element,
};
export default ChangleProfileModal