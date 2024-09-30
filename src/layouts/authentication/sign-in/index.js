import { useEffect, useState } from "react";
// react-router-dom components
import { useNavigate } from "react-router-dom";

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
import "./signIn.css"; // Make sure to import your CSS file

// Images
import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../redux/action/defaultActions";
import apiService from "../../../components/ApiSevices/ApiServices";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import app from "../../../firebase";
import { login } from "../../../redux/action/adminActions";
import { getErrorMessage } from "../../../examples/CustomError/errorMessages";
import PropTypes from "prop-types";


const SignIn = ({ FCMToken }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const actionDispatcher = useDispatch();

  // Function to handle password visibility toggle
  const [showPassword, setShowPassword] = useState(true);

  const handleChangePassword = (prop) => (event) => {
    setPassword(event.target.value);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  // Handle input change for email and password
  const handleChange = (type, e) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  // Authentication logic for sign-in
  const authentication = async (e) => {
    actionDispatcher(isLoading(true));
    try {
      const data = await apiService.login(email, password, FCMToken);
      actionDispatcher(openSnackbar(data?.message, "success"));
      actionDispatcher(login());
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error during authentication: ", error);
      actionDispatcher(
        openSnackbar(
          error?.response?.data.message
            ? error?.response?.data.message
            : getErrorMessage(error?.response?.status),
          "error"
        )
      );
    } finally {
      actionDispatcher(isLoading(false));
    }
  };

  return (
    <BasicLayout>
      <Box>
        <Grid container>
          <Grid item xs={0} sm={6} md={6} sx={{ borderRadius: "10px" }}>
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
                Sign In
              </MDTypography>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox fullWidth>
                  <MDBox mb={2}>
                    <lable style={{ fontSize: "18px", color: "rgba(121, 116, 126, 1)" }}>
                      Email Address
                    </lable>
                    <MDInput
                      placeholder="Enter your Email address here"
                      type="email"
                      fullWidth
                      onChange={(e) => handleChange("email", e)}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <lable style={{ fontSize: "18px", color: "rgba(121, 116, 126, 1)" }}>
                      Password
                    </lable>
                    <TextField
                      placeholder="***********"
                      size="medium"
                      type={showPassword ? "password" : "text"}
                      value={password}
                      onChange={handleChangePassword("password")}
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
                  {/* <MDBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MDTypography>
                  </MDBox> */}
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="primary" fullWidth onClick={authentication}>
                      sign in
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography
                      // component={Link}
                      // to="/authentication/forgotPassword"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate("/authentication/forgotPassword")}
                    >
                      Forgot Password ?
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

SignIn.propTypes = {
  FCMToken: PropTypes.string,
};


export default SignIn;
