import { Box, Button, Typography } from '@mui/material'
import MDBox from 'components/MDBox'
import MDButton from 'components/MDButton'
import MDTypography from 'components/MDTypography'

const NodataFound = () => {
    return (
        <>
            <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 340, width: "100%", maxHeight: 700, border: "1px solid gray", borderRadius: "15px" }}>
                <MDTypography fontWeight="regular" >There are no records to display</MDTypography>
            </MDBox>
        </>
    )
}

export default NodataFound