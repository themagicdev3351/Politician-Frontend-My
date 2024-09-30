import React, { useState } from 'react'
import Iconify from "examples/Iconify/Iconify";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DisplaySelectedImagesGrid from "./DisplaySelectedImagesGrid";
// import ImagePreviewModal from "./ImagePreviewModal";
import PropTypes from "prop-types";
import ImagePreviewModal from './ImagePreviewModal';
import { useDispatch } from 'react-redux';
import { isLoading, openSnackbar } from '../../../../redux/action/defaultActions';


const AddMedia = ({
    required,
    setSelectedFileUrls,
    setSelectedFiles,
    selectedFileUrls,
    selectedFiles,
}) => {
    const dispatch = useDispatch()
    const [openImagePreviewModal, setOpenImagePreviewModal] = useState(false);
    const handleFileChange = (event) => {
        const newFiles = event.target.files || [];
        if (selectedFiles.length > 0) {
            setSelectedFiles([...selectedFiles, ...Array.from(newFiles)]);
        } else {
            setSelectedFiles(Array.from(newFiles)); // Convert FileList to an array
        }
        const newUrls = [];
        for (let i = 0; i < newFiles.length; i++) {
            newUrls.push(URL.createObjectURL(newFiles[i]));
        }
        if (selectedFileUrls.length > 0) {
            setSelectedFileUrls([...selectedFileUrls, ...newUrls]);
        } else {
            setSelectedFileUrls(newUrls);
        }
    };
    const removeImage = (index) => {
        if (index >= 0 && index < selectedFiles.length) {
            const updatedFiles = [...selectedFiles]; // Create a copy to avoid mutation
            updatedFiles.splice(index, 1); // Remove the file at the specified index

            const updatedUrls = selectedFileUrls?.filter((_, i) => i !== index); // Remove corresponding URL

            setSelectedFiles(updatedFiles);
            setSelectedFileUrls(updatedUrls);
        } else {
            console.error("Invalid index for image removal");
        }
    };


    // handle toggl image
    const handleToggleImageModal = () =>
        setOpenImagePreviewModal(!openImagePreviewModal);

    const handleOpenImagePrevieModal = () => {
        handleToggleImageModal();
    };

    const handleCloseImagePrevieModal = () => handleToggleImageModal();

    return (
        <>
            <Grid container mb={5} rowGap={2}>
                <Grid
                    component={"label"}
                    //   htmlFor={labelInputId}
                    xs={12}
                    md={5}
                    lg={4}
                >
                    <Typography gutterBottom color="#6E6B7B" fontSize={"16px"} >
                        Add image and Video
                    </Typography>
                    {required ? <span style={{ color: "red" }}> *</span> : ""}
                </Grid>
                <Grid
                    item
                    container
                    display={"flex"}
                    rowGap={2}
                    //   columnGap={0.5}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    xs={12}
                    md={6.75}
                    lg={8}
                >
                    <Grid
                        item
                        p={0}
                        component={"label"}
                        border={"2px dashed gray"}
                        borderRadius={"10px"}
                        htmlFor="image-upload"
                        // bgcolor={"red"}
                        xs={12}
                        md={6}
                        lg={5.25}
                        // color={"gray"}
                        minHeight={100}
                        maxHeight={200}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={"column"}
                        bgcolor={"primary"}
                        // onClick={handleGridClick}
                        sx={{ cursor: "pointer" }}
                    >
                        <input
                            accept="image/*, video/*"
                            id="image-upload"
                            type="file"
                            hidden
                            multiple // Allow selecting multiple files
                            onChange={handleFileChange}
                        //   ref={fileInputRef}
                        />
                        <Iconify icon="bi:images" />
                        <Typography>Upload pictures</Typography>
                    </Grid>

                    {selectedFiles && selectedFiles.length > 0 ? (
                        <Grid
                            item
                            container
                            xs={12}
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center "}
                            md={5.75}
                            rowGap={0.5}
                            // columnGap={0.5}
                            p={0}
                            lg={6.25}
                        >
                            <DisplaySelectedImagesGrid
                                images={selectedFileUrls}
                                handleRemoveImage={removeImage}
                                handleOpenModal={handleOpenImagePrevieModal}
                            />
                        </Grid>
                    ) : (
                        ""
                    )}
                </Grid>
            </Grid>
            <ImagePreviewModal
                open={openImagePreviewModal}
                // open={true}
                handleRemoveImage={removeImage}
                handleClose={handleCloseImagePrevieModal}
                selectedImages={selectedFileUrls}
            />
        </>
    )
}
AddMedia.propTypes = {
    selectedFileUrls: PropTypes.array,
    selectedFiles: PropTypes.array,
    setSelectedFiles: PropTypes.func,
    setSelectedFileUrls: PropTypes.func,
    required: PropTypes.bool,
};
export default AddMedia