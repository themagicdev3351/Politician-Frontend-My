import { Checkbox, Chip, Stack, styled } from "@mui/material";
import apiService from "components/ApiSevices/ApiServices";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../../redux/action/defaultActions";
import { getErrorMessage } from "../../../../../examples/CustomError/errorMessages";

const ManageHashtag = () => {
  const actionDispatcher = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  // Function to handle deleting a hashtag
  const selectedHashtag = (id) => {
    setSelectedHashtags((prevSelected) => {
      // Add or remove the ID from the selectedHashtags array
      if (prevSelected.includes(id)) {
        return prevSelected.filter((hashtagId) => hashtagId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  // ******************************* GET ALL HASHTAG *********************************
  const getAllhashTagFunc = async (e) => {
    try {
      const res = await apiService.getAllhashTag();
      // console.log("alllhashtag===>", res)
      setOptions(res?.allHashtags);
    } catch (error) {
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request error:", error.request);
      } else {
        // Something else happened in setting up the request
        console.error("Error", error.message);
      }
    }
  };
  // ***************************************************************************
  // ******************************* DELETE SELECTED HASHTAG *********************************
  const handleDelete = async (id) => {
    actionDispatcher(isLoading(true));
    try {
      const res = await apiService.deleteHashtags(selectedHashtags);

      actionDispatcher(isLoading(false));
      getAllhashTagFunc();
      actionDispatcher(openSnackbar(`hashtag is deleted successfully!`, "success"));
    } catch (error) {
      actionDispatcher(isLoading(false));
      console.log("error", error);
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
    }
  };
  // ***************************************************************************

  useEffect(() => {
    getAllhashTagFunc();
  }, []);

  const StyledChip = styled(Chip)(({ isSelected }) => ({
    background: "#7b809a",
    color: "white",
    display: "flex",
    alignItems: "center",
  }));

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    borderColor: "white",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgba(206,217,224,.5)",
    },
  }));
  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#FF7518",
    borderColor: "white",
    backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#FF7518",
    },
  });

  // Inspired by blueprintjs
  function BpCheckbox(props) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mx={2} sx={{ display: "grid", alignitem: "center", justifycontent: "start" }}>
        <MDBox display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <MDTypography variant="outline" fontSize="16px" fontWeight="medium">
            Hashtags
          </MDTypography>
          <MDButton
            size={"medium"}
            variant={"contained"}
            color={"primary"}
            my={2}
            onClick={handleDelete}
          >
            {" "}
            <DeleteOutlineIcon fontSize="2rem !important" /> &nbsp; Delete selected files
          </MDButton>
        </MDBox>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            marginTop: "1rem",
            flexWrap: "wrap",
            gap: 1,
          }}
          maxWidth="100vw"
        >
          {options.map((option, index) => {
            const isSelected = selectedHashtags.includes(option._id);
            return (
              <MDBox
                key={index}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  margin: "5px", // Adjust margin as needed
                }}
                onClick={() => selectedHashtag(option._id)}
              >
                {/* <Chip
                  style={{
                    // background: linear-gradient(106.5deg, rgba(255, 215, 185, 0.91) 23%, rgba(223, 159, 247, 0.8) 93%);
                    background: isSelected
                      ? "#f53f36"
                      : "linear-gradient(104deg, rgba(233,30,30,1) 12%, rgba(26,150,12,1) 54%, rgba(51,110,236,1) 72%)",
                    color: "white",
                  }}
                  label={option?.hashtag}
                  // onDelete={() => selectedHashtag(option._id)}
                  checked={isSelected}
                /> */}
                <StyledChip
                  // onDelete={isSelected ? undefined : () => {}}
                  label={
                    <>
                      {option?.hashtag}

                      {/* <Checkbox
                        checked={isSelected}
                        color=""
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectedHashtag(option._id);
                        }}
                        sx={{
                          padding: 0,
                          marginLeft: 1,
                          border: "0px",
                        }}
                      /> */}
                      {isSelected ? (
                        <BpCheckbox
                          checked={isSelected}
                          sx={{
                            padding: 0,
                            marginLeft: 1,
                            border: "0px",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </>
                  }
                  isSelected={isSelected}
                />
              </MDBox>
            );
          })}
        </Stack>
      </MDBox>
    </DashboardLayout>
  );
};

export default ManageHashtag;
