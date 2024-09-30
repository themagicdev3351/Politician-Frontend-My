import React from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
const Iconify = ({
    icon,
    width = 25,
    sx,
    ...other
}) => {
    return (
        <Box
            // ref={ref}
            component={Icon}
            icon={icon}
            sx={{ width, height: width, ...sx }}
            {...other}
        />
    );
};
Iconify.propTypes = {
    icon: PropTypes.string,
    width: PropTypes.string,
    sx: PropTypes.object,
    ohter: PropTypes.object,
};
export default Iconify;
