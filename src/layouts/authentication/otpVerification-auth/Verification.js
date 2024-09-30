import { useEffect, useState } from "react";
// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
// import BannerImage from "../../../assets/images/image 51.jpg";
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
import { MuiOtpInput } from "mui-one-time-password-input";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

function Verification() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const location = useLocation();

  const { email } = location.state || {}; // Destructure the state object

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  // *********************************************************

  // ***********************  Api OTP Verification Section  ***********************************
  const authentication = async (e) => {
    e.preventDefault();
    if (otp === "" || otp.length < 6) {
      actionDispatcher(openSnackbar("Please enter 6 digit OTP", "error"));
    } else {
      try {
        const data = await apiService.optVerification(email, otp);
        // console.log("catch me pahuncho===>", data);
        actionDispatcher(openSnackbar(data?.message, "success"));
        navigate("/authentication/resetPassword", { replace: true, state: data });
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
    }
  };
  // *********************************************************
  // ***********************  Api Resend OTP Section  ***********************************
  const resendOtp = async (e) => {
    actionDispatcher(isLoading(true));

    try {
      const data = await apiService.forgot(email);

      actionDispatcher(openSnackbar(data?.message, "success"));
      // console.log("=====>passingData", data)
      navigate("/authentication/optVerification", { replace: true, state: data });
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

  // ****************************** hide mail section *******************************
  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    if (localPart.length > 2) {
      return `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}@${domain}`;
    }
    return email; // if local part is too short to mask
  };
  // **********************************************************************************************

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
                Enter OTP
              </MDTypography>
              <MDTypography fontSize="18px" fontWeight="200px" my={1} mx={3}>
                We sent a verification code to your Email. Enter the code from the email in the
                field below.
              </MDTypography>
              <MDTypography fontSize="15px" fontWeight="200px" my={1} mx={3}>
                {maskEmail(email)}
              </MDTypography>
              <MDTypography fontSize="15px" fontWeight="200px" my={1} mx={3}>
                Type your 6 digit security code
              </MDTypography>

              <MDBox pb={3} px={3}>
                <MDBox fullWidth>
                  <MDBox mb={2}>
                    <MuiOtpInput value={otp} required onChange={handleChange} length={6} />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      color="primary"
                      fontSize="4rem"
                      fullWidth
                    >
                      reset
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Didn’t get the code?
                      <MDTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                        onClick={() => resendOtp(email)}
                      >
                        &nbsp; Resend
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

export default Verification;
