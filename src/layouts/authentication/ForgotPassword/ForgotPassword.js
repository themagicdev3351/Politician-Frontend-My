import { useState } from "react";
// react-router-dom components
import { Link, useLocation, useNavigate } from "react-router-dom";

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
import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import apiService from "../../../components/ApiSevices/ApiServices";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";

function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { email } = location.state || {}; // Destructure the state object

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // ***********************  Stored Value inside textBox  ***********************************

  const handleChange = (type, e) => {
    if (type === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  // *********************************************************

  // ***********************  Api SignIn Section  ***********************************
  const authentication = async (e) => {
    actionDispatcher(isLoading(true));
    try {
      const data = await apiService.reset(email, password, confirmPassword);
      // console.log("catch me pahuncho===>", data);
      actionDispatcher(openSnackbar(data?.message, "success"));
      navigate("/authentication/sign-in", { replace: true });
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
              sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <MDTypography variant="h2" fontWeight="medium" my={1} textAlign="center">
                Reset Password
              </MDTypography>

              <MDTypography fontSize="15px" fontWeight="200px" my={1} mx={3}>
                for &nbsp;
                <MDTypography variant="button" color="dark" fontWeight="medium" textGradient>
                  {email}
                </MDTypography>
              </MDTypography>

              <MDBox pb={3} px={3}>
                <MDBox fullWidth>
                  <MDBox mb={2}>
                    {/* <MDInput type="password" label="Password" fullWidth
                                         onChange={(e) => handleChange("password", e)} /> */}
                    <TextField
                      size="medium"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      value={password}
                      onChange={(e) => handleChange("password", e)}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    {/* <MDInput type="password" label="Confirm Password"
                                         fullWidth onChange={(e) => handleChange("confirmPassword", e)} /> */}
                    <TextField
                      size="medium"
                      type={showPassword ? "text" : "password"}
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e)}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={togglePassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </MDBox>

                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="primary" fullWidth onClick={authentication}>
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

export default ForgotPassword;
