import React from "react";
import { Box, IconButton, Modal, Stack } from "@mui/material";
import Iconify from "examples/Iconify/Iconify";
import PropTypes from "prop-types";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: { xs: 350, sm: 500, md: 1100 },
    //   width: { xs: 350, sm: 500, md: 1100 },
    minWidth: { xs: 350, sm: 450, md: "auto", lg: "auto" },
    minHeight: "200px",
    maxHeight: "500px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalContainer = ({
    children,
    open,
    handleClose,
    onClose,
}) => {

    return (
        <Modal
            open={open}
            onClose={onClose ? () => { } : handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <Stack alignItems={"flex-end"} mt={-1} marginRight={-3}>
                    <IconButton onClick={handleClose}>
                        <Iconify icon="carbon:close-filled" />
                    </IconButton>
                </Stack>
                <Box
                    sx={{
                        overflowY: "auto",
                        maxHeight: "450px",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};
ModalContainer.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.array,
    onClose: PropTypes.func,
};
export default ModalContainer;
