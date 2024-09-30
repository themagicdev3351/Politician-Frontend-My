import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { Backdrop, Paper } from "@mui/material";
import PropTypes from "prop-types";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 300,
    maxWidth: { xs: 350, sm: 500, md: 1100 },
    height: "auto",
    maxHeight: { xs: "90vh" },
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    boxShadow: "3px 4px 16px -2px black",
};

const ModalComponent = ({ open, handleClose, children, type }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={() => (type === "delete" ? () => { } : handleClose)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Backdrop
                    open={open}
                    sx={{
                        color: "#fff",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        // backgroundColor: "red",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                // onClick={handleClose}
                >
                    <Box
                        sx={{
                            ...style,
                            p: type === "delete" ? 2 : 4,
                        }}
                        component={Paper}
                        elevation={4}
                    >
                        {type === "delete" ? (
                            ""
                        ) : (
                            <CancelIcon
                                sx={{
                                    fontSize: "30px",
                                    cursor: "pointer",
                                    position: "absolute",
                                    top: 9,
                                    right: 9,
                                }}
                                onClick={handleClose}
                            />
                        )}
                        {children}
                    </Box>
                </Backdrop>
            </Modal>
        </>
    );
};
ModalComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    handleClose: PropTypes.func,
};
export default ModalComponent;
