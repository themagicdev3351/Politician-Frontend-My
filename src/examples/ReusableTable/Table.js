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
import { styled } from "@mui/material/styles";

const CustomNoRowsOverlay = () => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100px" }}
    >
      <span>No Rows to display</span>
    </div>
  );
};
export default function Table({ rows, columns, CustomToolbar, changePage, pageInfo }) {
  // console.log("row", rows)
  const calculateHeight = (height) => {
    if (height === 5) {
      return 400;
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
  };
  const getHeight = calculateHeight(pageInfo.limitPerPage);
  // console.log("rows", rows);
  return (
    <MDBox
      sx={{
        width: "100%",
        height: getHeight,
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
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        sx={{
          width: "fit-content",
          minWidth: "100%",
          fontWeight: 400,
          color: "#344767",
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
            {
              outline: "none",
            },
        }}
        disableColumnMenu
      />
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <MDTypography sx={{ fontSize: "14.36px" }}>{`Showing ${
          (pageInfo?.currentPage - 1) * pageInfo?.limitPerPage + 1
        } to ${Math.min(pageInfo?.currentPage * pageInfo?.limitPerPage, pageInfo?.totalData)} of ${
          pageInfo?.totalData
        } entries`}</MDTypography>

        <Pagination
          count={pageInfo?.totalPages}
          variant="outlined"
          sx={{ float: "right", m: 2 }}
          onChange={(e, page) => changePage(page)}
        />
      </Stack>
    </MDBox>
  );
}
Table.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  CustomToolbar: PropTypes.func,
  changePage: PropTypes.func,
  pageInfo: PropTypes.object,
};
