import React from "react";
import PropTypes from "prop-types";
import ModalComponent from "examples/ModalComponent/ModalComponent";
import { Box, Stack } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const RevokeConfirmation = ({
  handleClose,
  revokePermission,
  changeUserPermission,
  singleStatus,
}) => {
  // console.log("revoke Permission", revokePermission)
  // console.log("singleStatus ===> ", singleStatus)

  return (
    <ModalComponent open={revokePermission.open} handleClose={handleClose}>
      {singleStatus === "undefined" ? (
        <Stack spacing={1} width={"320px"}>
          <MDTypography fontSize="20px">{`Are you sure to you want to ${
            revokePermission.verification === "approved"
              ? "revoke"
              : revokePermission.verification === "rejected"
              ? "assign"
              : "Update"
          } the permission ?`}</MDTypography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <MDButton
              size="small"
              varient="contained"
              color="primary"
              onClick={changeUserPermission}
            >
              {revokePermission.verification === "approved"
                ? "Revoke"
                : revokePermission.verification === "rejected"
                ? "Assign"
                : "Update"}
            </MDButton>
            <MDButton size="small" varient="outlined" color="primary" onClick={handleClose}>
              Cancel
            </MDButton>
          </Box>
        </Stack>
      ) : (
        <Stack spacing={1} width={"320px"}>
          <MDTypography fontSize="20px">{`Are you sure to you want to ${
            singleStatus === "approved" ? "approved" : "revoked"
          } the permission ?`}</MDTypography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <MDButton
              size="small"
              varient="contained"
              color="primary"
              onClick={changeUserPermission}
            >
              {singleStatus === "approved" ? "Approve" : "Revoked"}
            </MDButton>
            <MDButton size="small" varient="outlined" color="primary" onClick={handleClose}>
              Cancel
            </MDButton>
          </Box>
        </Stack>
      )}
    </ModalComponent>
  );
};
RevokeConfirmation.propTypes = {
  revokePermission: PropTypes.object,
  handleClose: PropTypes.func,
  changeUserPermission: PropTypes.func,
  singleStatus: PropTypes.string,
};
export default RevokeConfirmation;
