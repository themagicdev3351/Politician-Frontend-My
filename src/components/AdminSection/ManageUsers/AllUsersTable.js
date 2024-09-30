import * as React from "react";
import { Suspense } from "react";
import Box from "@mui/material/Box";
import {
    DataGrid,
    GridColDef,
    GridValueGetterParams,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { Pagination, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDPagination from "components/MDPagination";

export default function AllUsersTable({
    rows,
    columns,
    CustomToolbar,
    changePage,
    pageInfo,
}) {
    // console.log("limitPerPage", pageInfo.limitPerPage)
    const calculateHeight = (height) => {
        if (height === 5) {
            return 420;
        } else if (height === 10) {
            return 680;

        } else if (height === 15) {
            return 930;

        } else if (height === 20) {
            return 1200;

        } else if (height === 25) {
            return 1450;

        } else {
            return 1710;

        }
    }
    const getHeight = calculateHeight(pageInfo.limitPerPage)
    return (
        <Box
            sx={{
                width: "100%",
                height: getHeight
            }}
        >
            <DataGrid
                rows={rows}
                getRowId={(row) => row._id}
                columns={columns}
                // checkboxSelection
                // disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                slots={{
                    toolbar: CustomToolbar,
                }}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
                    {
                        outline: "none",
                    },
                }}
                disableColumnMenu
            />
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <MDTypography
                    sx={{ fontSize: "14.36px" }}
                >{`Showing ${(pageInfo?.currentPage - 1) * pageInfo?.limitPerPage + 1
                    } to ${Math.min(
                        pageInfo?.currentPage * pageInfo?.limitPerPage,
                        pageInfo?.totalData
                    )} of ${pageInfo?.totalData} entries`}</MDTypography>


                <Pagination
                    count={pageInfo?.totalPages}
                    variant="outlined"
                    sx={{ float: "right", m: 2 }}
                    onChange={(e, page) => changePage(page)}
                />
            </Stack>
        </Box>
    );
}
AllUsersTable.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    CustomToolbar: PropTypes.func,
    changePage: PropTypes.func,
    pageInfo: PropTypes.object,
};
