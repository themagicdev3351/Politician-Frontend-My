import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ModalContainer from "examples/ModalContainer/ModalContainer";
import Iconify from "examples/Iconify/Iconify";

const ImagePreviewModal = ({
    open,
    handleClose,
    selectedImages,
    handleRemoveImage,
}) => {
    // console.log("modall===>",open)
    return (
        <>
            <ModalContainer open={open} handleClose={handleClose}>
                <Grid
                    container
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-evenly"}
                    flexGrow={"revert"}
                    // columnGap={2}
                    width={"100%"}
                    rowGap={2}
                >
                    {selectedImages && selectedImages.length > 0 ? (
                        selectedImages.map((imgurl, index) => {
                            return (
                                <Grid
                                    key={index}
                                    item
                                    xs={5.75}
                                    borderRadius={"5px"}
                                    sm={3.75}
                                    lg={2.75}
                                    position={"relative"}
                                >
                                    {/* <Image fill width={100} src={selectedImages[0]} alt="image" /> */}
                                    <img
                                        src={imgurl}
                                        alt="image"
                                        width={"100%"}
                                        height={"100%"}
                                        style={{ borderRadius: "5px" }}
                                    />
                                    {/* <Image
                    src={imgurl}
                    alt="image"
                    // fill
                    fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                      objectFit: "cover", // cover, contain, none
                    }}
                  /> */}

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            //   height: "100%",
                                            minHeight: 80,
                                            // maxHeight: 100,
                                            height: "100%",
                                            width: "100%",
                                            color: "white",
                                            borderRadius: "5px",
                                            backgroundColor: "rgba(0,0,0,0.2)",
                                        }}
                                    >
                                        <Stack
                                            direction={"row"}
                                            justifyContent={"end"}
                                            alignItems={"center"}
                                            fontSize={"10px"}
                                            px={0.5}
                                        //   bgcolor={"red"}
                                        >
                                            <IconButton
                                                size="small"
                                                sx={{ color: "whitesmoke" }}
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <Iconify icon="ic:round-delete" />
                                            </IconButton>
                                            {/* <Typography
                          bgcolor={"whitesmoke"}
                          color={"black"}
                          p={0.25}
                          borderRadius={"50%"}
                          fontSize={"14px"}
                          width={"25px"}
                          textAlign={"center"}
                        >
                          {index + 1}
                        </Typography> */}
                                        </Stack>
                                    </Box>
                                </Grid>
                            );
                        })
                    ) : (
                        <>
                            <Box
                                // bgcolor={"red"}
                                display={"flex"}
                                height={"100%"}
                                width={"100%"}
                                justifyItems={"center"}
                                justifyContent={"center"}
                                justifySelf={"center"}
                            >
                                <Typography>Empty : No Image Selected</Typography>
                            </Box>
                        </>
                    )}
                </Grid>
            </ModalContainer>
        </>
    );
};
ImagePreviewModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    selectedImages: PropTypes.array,
    handleRemoveImage: PropTypes.func,
};
export default ImagePreviewModal;
