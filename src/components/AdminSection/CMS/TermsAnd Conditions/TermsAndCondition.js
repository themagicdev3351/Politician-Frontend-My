import React, { useEffect, useState } from "react";
import Footer from "examples/Footer";
import { Card } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isLoading, openSnackbar } from "../../../../redux/action/defaultActions";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// Import the CSS file
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import apiService from "components/ApiSevices/ApiServices";

function TermsAndCondition() {
    const actionDispatcher = useDispatch();
    const [editorData, setEditorData] = useState("");

    // ************************** post data Through Api stored into a state   *******************************

    const SubmitTermsAndConditions = async () => {
        actionDispatcher(isLoading(true));
        // console.log("policyAnd Privacy=======>", editorData)
        try {
            const res = await apiService.PostTermsAndConditions(editorData)
            // console.log("privaryPolicy====>", res)
            actionDispatcher(isLoading(false));
            PostTermsAndConditions();
            actionDispatcher(openSnackbar(res?.data?.message, "success"));
        } catch (error) {
            actionDispatcher(isLoading(false));
            actionDispatcher(openSnackbar(error?.response?.data?.message, "error"));
            console.log("error", error);
        }
    };
    // *************************************************************************************************

    // ********************Get poicy data  function********************
    const PostTermsAndConditions = async () => {
        try {
            const res = await apiService.getTermsAndConditions()
            console.log("hellogetTermsAndConditions", res)
            setEditorData(res?.data?.data?.termsCondition);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Response error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Request error:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error', error.message);
            }
        }
    };
    // ***************************************************************************************

    // ******************************Stored VAlue inside the state**********************************
    const handleEditorChange = (editor) => {
        const data = editor.getData();
        setEditorData(data);
    };
    // *********************************************************************************************
    useEffect(() => {
        PostTermsAndConditions();
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Card sx={{ p: 2, px: 4 }}>
                <MDBox  mb={2}>
                    <MDTypography p={2} variant={"h5"}>Terms And Conditions</MDTypography>
                </MDBox>
                <CKEditor
                    editor={ClassicEditor}
                    // config={editorConfiguration}
                    config={{
                        // ckfinder: {
                        //     Upload the images to the server using the CKFinder QuickUpload command
                        //     You have to change this address to your server that has the ckfinder php connector
                        //     uploadUrl: "/api/v1/admin/save/gurash/saving/image",
                        // },
                    }}
                    data={editorData ? editorData : ""}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => handleEditorChange(editor)}
                />
                <MDBox
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        margin: "1rem",
                    }}
                >
                    <MDButton variant="gradient" color="primary" sx={{ margin: "1rem" }} onClick={SubmitTermsAndConditions}>
                        Submit
                    </MDButton>
                </MDBox>
                {/* <Footer /> */}
            </Card>
        </DashboardLayout>

    );
}

export default TermsAndCondition;
