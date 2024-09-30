import { Box, Button, Modal, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ open, handleClose, handleCancel, handleAction, message }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,

    // bgcolor: "background.paper",
    // border: "2px solid #000",
    // border: "0px solid transparent",
    borderRadius: "20px",
    // boxShadow: 16,
    p: 4,
    outline: "none" // Ensure no outline on the Box component
  };
  return (
    <>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={Paper} elevation={24} border={"none"} >
          <Stack mt={2} mb={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
            <img src="/deleteIcon2.svg" height={50} width={50} alt="del" />
          </Stack>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            {message}
          </Typography>
          <Stack mt={2} direction={"row"} justifyContent={"center"} columnGap={2}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              color="inherit"
              sx={{ bgcolor: "transparent", color: "gray", borderColor: "gray" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAction}
              color="warning"
              sx={{ bgcolor: "orange", color: "white !important" }}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

DeleteConfirmationModal.propTypes = {
  open: PropTypes.bool,
  handleAction: PropTypes.func,
  handleCancel: PropTypes.func,
  handleClose: PropTypes.func,
  message: PropTypes.string,
};
export default DeleteConfirmationModal;
