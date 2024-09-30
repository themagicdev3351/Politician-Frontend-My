import { useState } from "react";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import BannerImage from "../../../assets/images/signUp.png";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import { Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import apiService from "../../../components/ApiSevices/ApiServices";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

function cover() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  // *********************************************************

  // ***********************  Api SignIn Section  ***********************************
  const authentication = async (e) => {
    e.preventDefault();
    actionDispatcher(isLoading(true));

    try {
      const data = await apiService.forgot(email);
      // const response = await axios.post(`/api/v1/admin/forgot/password`, { email });
      console.log("=====>", data);
      actionDispatcher(openSnackbar(data?.message, "success"));
      navigate("/authentication/optVerification", { state: data });
      actionDispatcher(isLoading(false));
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
  // *********************************************************

  return (
    <BasicLayout>
      <Box>
        <Grid container>
          <Grid item xs={0} sx={6} md={6}>
            <Box className="image-container">
              <img src={BannerImage} alt="Banner Image" />
            </Box>
          </Grid>
          <Grid item xs={12} sx={6} md={6}>
            <Stack
              component={"form"}
              onSubmit={authentication}
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MDTypography variant="h2" fontWeight="medium" my={1} textAlign="center">
                Forgot Password ?
              </MDTypography>
              <MDTypography fontSize="15px" fontWeight="200px" my={1} mx={3}>
                Enter your email, and we will send you instructions to reset your password.
              </MDTypography>
              <MDBox pb={3} px={3}>
                <MDBox fullWidth>
                  <MDBox mb={2}>
                    <MDInput
                      type="email"
                      required
                      label="email"
                      fullWidth
                      onChange={(e) => handleChange(e)}
                    />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton type="submit" variant="gradient" color="primary" fullWidth>
                      reset
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MDTypography
                        // component={Link}
                        // to="/authentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/authentication/sign-in")}
                      >
                        Sign In
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </BasicLayout>
  );
}

export default cover;
