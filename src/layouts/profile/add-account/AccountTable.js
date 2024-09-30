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

export default function AccountTable({
    rows,
    columns,
    // CustomToolbar,
    // changePage,
    // pageInfo,
}) {
    // console.log("row", rows)
    return (
        <MDBox
            sx={{
                width: "100%",
                // height: pageInfo.pageSize == 5 ? 85 * pageInfo.pageSize : 65 * pageInfo.pageSize,
            }}
        >
            <DataGrid
                rows={rows}
                getRowId={(row) => row.hasOwnProperty('ticketID') ? row.ticketID : row._id}
                columns={columns}
                // checkboxSelection
                // disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
                // slots={{
                //     toolbar: CustomToolbar,
                // }}
                sx={{
                    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
                    {
                        outline: "none",
                    },
                }}
            />

        </MDBox>
    );
}
AccountTable.propTypes = {
    rows: PropTypes.array,
    columns: PropTypes.array,
    // CustomToolbar: PropTypes.func,
    // changePage: PropTypes.func,
    // pageInfo: PropTypes.object,
};
